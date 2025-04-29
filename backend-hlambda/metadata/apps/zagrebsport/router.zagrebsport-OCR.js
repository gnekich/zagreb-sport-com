import express from 'express';
import asyncHandler from 'express-async-handler';
import { DateTime } from 'luxon'; // Import third-party modules (Don't forget to install them)
import { executeWithAdminRights, getEnvValue, isEnvTrue } from "hlambda";

import callTextract from "./textract/callTextract.js";
import callChatGPT from "./openai/callChatGPT.js";
import { callChatGPTRaw } from "./openai/callChatGPT.js";
import { cloudPush } from "./firebase-cloud-push/cloudPush.js";

// import { constants, isEnvTrue, getEnvValue } from './constants.demo.js';
// import errors from './errors.demo.js';

// Create express router
const router = express.Router();


export const s3UploadEventResolver = async (req, res) => {
  // Get user details and auth values...
  const event = req.body?.event;

  console.log("Event from AWS EventBridge(S3)");
  console.log(JSON.stringify(event, null, 2));

  // Return the response instantly, we received the event (To not get billed by Bezos)
  res.send(JSON.stringify({ success: "ok" }));

  // We extract the key
  const key = event?.Records?.[0]?.s3?.object?.key; // event?.detail?.object?.key;

  if (key.startsWith('uploads/n-')) {
    // This is special file in blob and should be news... we attach new 

    // Save the response to the database as the result of the document processing...
    const responseResult = await executeWithAdminRights(
        /* GraphQL */ `
          mutation CreateNajava($payload: feed_insert_input!) {
            insert_feed_one(object: $payload) {
              id
            }
          }
        `,
      undefined,
      {
        // id: documentSubmissionId,
        // savez_id: "",
        payload: {
          slika_url: `https://zagrebsport-data-f1337f33a1.s3.eu-central-1.amazonaws.com/${key}`,
        },
      }
    );
    if (responseResult.errors) {
      // Handle those errors like a pro
      console.error(responseResult.errors);
      // TODO: Log errors thrown to status of document submission with error details...
      throw new Error(
        "Error while updating document submission after processing!"
      );
    }

    return;
  } else {
    // Save the response to the database as the result of the document processing...
    const responseResult = await executeWithAdminRights(
        /* GraphQL */ `
          mutation CreateNajava($payload: feed_insert_input!) {
            insert_feed_one(object: $payload) {
              id
            }
          }
        `,
      undefined,
      {
        // id: documentSubmissionId,
        // savez_id: "",
        payload: {
          slika_url: `https://zagrebsport-data-f1337f33a1.s3.eu-central-1.amazonaws.com/${key}`,
        },
      }
    );
  }

  // call processing of AWS Textract.
  const textParsed = await callTextract(key);

  if (typeof textParsed !== "string") {
    throw Error("Error while trying to do textract on key", key);
  }

  // On the result of textract we call ChatGPT with template.
  const text = `\n+${textParsed}`;

  const finalResultFromLLM = await callChatGPT(text);

  console.log("finalResultFromLLM", finalResultFromLLM);

  // Save the response to the database as the result of the document processing...
  const responseResult = await executeWithAdminRights(
      /* GraphQL */ `
        mutation UnesiRezultat($payload: rezultati_insert_input!) {
          insert_rezultati_one(object: $payload ) {
            id
             payload
          }
        }
      `,
    undefined,
    {
      // id: documentSubmissionId,
      // savez_id: "",
      payload: {
        // status: "completed",
        // ocr_result: text,
        payload: finalResultFromLLM,
      },
    }
  );
  if (responseResult.errors) {
    // Handle those errors like a pro
    console.error(responseResult.errors);
    // TODO: Log errors thrown to status of document submission with error details...
    throw new Error(
      "Error while updating document submission after processing!"
    );
  }

  await cloudPush('everyone', 'OBJAVA REZULTATA!!!').catch((error) => console.log(error));
};

// Create route
router.post(
  "/zagrebsport/api/v1/s3-upload-event",
  asyncHandler(s3UploadEventResolver)
);


router.post("/zagrebsport/api/v1/najava",
  asyncHandler(async (req, res) => {
    // Get user details and auth values...
    const ulaz = req.body?.ulaz;

    const prompt = `
Koristeći 5W napravi članak s naslovom koji nije bombastičan ali je zanimljiv za navedeni tekst koji ti šaljem u sljedećoj poruci.
Nemoj odgovarati ništa osim sadržaja članka, vrati sadržaj kao JSON, pokušaj najbolje što možeš, format {"naslov": "__", "sadrzaj": "__"}
Naslov neka ne bude pre dug
`;

    const finalResultFromLLM = await callChatGPTRaw(prompt, ulaz);

    console.log("finalResultFromLLM", finalResultFromLLM);

    return res.json(finalResultFromLLM);
  })
);

router.all("/zagrebsport/api/v1/push",
  asyncHandler(async (req, res) => {
    // Get user details and auth values...
    //const ulaz = req.body?.ulaz;

    const cloudPushResult = await cloudPush('everyone', 'ZICER - Nova obavijest!');

    console.log("cloudPushResult", cloudPushResult);

    return res.json(cloudPushResult);
  })
);


export default router;
