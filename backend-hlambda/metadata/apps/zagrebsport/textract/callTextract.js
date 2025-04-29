import {
    TextractClient,
    AnalyzeDocumentCommand,
    DetectDocumentTextCommand,
  } from "@aws-sdk/client-textract";
  
  import transformTextractResultToTextLines from "./transformer/pureTextTransformer.js";
  
  export const callTextract = async (key) => {
    const BUCKET =
      process.env.ZAGREBSPORT_AI_SERVICE_PRINCIPAL_CLIENT_UPLOAD_AWS_BUCKET_NAME;
    const AWS_REGION =
      process.env.ZAGREBSPORT_AI_SERVICE_PRINCIPAL_CLIENT_UPLOAD_AWS_BUCKET_REGION;
    const AWS_ACCESS_KEY_ID =
      process.env.ZAGREBSPORT_AI_SERVICE_PRINCIPAL_AWS_ACCESS_KEY_ID;
    const AWS_SECRET_ACCESS_KEY =
      process.env.ZAGREBSPORT_AI_SERVICE_PRINCIPAL_AWS_SECRET_ACCESS_KEY;
  
    const credentials = {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    };
  
    // A client can be shared by different commands.
    const client = new TextractClient({ credentials, region: AWS_REGION });
  
    const params = {
      Document: {
        // Document
        // Bytes: "BLOB_VALUE",
        S3Object: {
          Bucket: BUCKET,
          Name: key,
          // Version: "STRING_VALUE",
        },
      },
      //   FeatureTypes: [
      //     // FeatureTypes // required
      //     // "TABLES",
      //     // "FORMS",
      //     // "QUERIES",
      //     // "SIGNATURES",
      //   ],
      //   HumanLoopConfig: {
      //     // HumanLoopConfig
      //     HumanLoopName: "STRING_VALUE", // required
      //     FlowDefinitionArn: "STRING_VALUE", // required
      //     DataAttributes: {
      //       // HumanLoopDataAttributes
      //       ContentClassifiers: [
      //         // ContentClassifiers
      //         "FreeOfPersonallyIdentifiableInformation" || "FreeOfAdultContent",
      //       ],
      //     },
      //   },
      //   QueriesConfig: {
      //     // QueriesConfig
      //     Queries: [
      //       // Queries // required
      //       {
      //         // Query
      //         Text: "STRING_VALUE", // required
      //         Alias: "STRING_VALUE",
      //         Pages: [
      //           // QueryPages
      //           "STRING_VALUE",
      //         ],
      //       },
      //     ],
      //   },
    };
    // const command = new AnalyzeDocumentCommand(params);
    const command = new DetectDocumentTextCommand(params);
  
    // async/await.
    try {
      const data = await client.send(command);
      const reqId = data?.$metadata?.requestId ?? uuidv4(); // We prefer AWS reqId.
  
      // Transform result to the .txt result
      const txtData = `\n+${transformTextractResultToTextLines(data)}`;
  
      console.log("reqId", reqId, txtData);
  
      return transformTextractResultToTextLines(data);
    } catch (error) {
      // error handling.
      console.log(error);
      const { requestId, httpStatusCode, cfId, extendedRequestId } =
        error?.$metadata;
      console.log({ httpStatusCode, requestId, cfId, extendedRequestId });
    } finally {
      // finally.
      console.log("Finally!");
    }
    return;
  };
  
  export default callTextract;
  