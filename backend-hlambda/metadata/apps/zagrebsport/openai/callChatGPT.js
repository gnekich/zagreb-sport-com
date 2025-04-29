import OpenAI from "openai";

export const callChatGPT = async (text) => {
  const openai = new OpenAI({
    apiKey: process.env.ZAGREBSPORT_AI_SERVICE_PRINCIPAL_OPENAI_KEY, // This is also the default, can be omitted
  });

  const templateJSON_HR = {
    poredak: [
      { ime: "TIM6", bodovi: "99.9",  mjesto: 1},
      { ime: "Parizeri", bodovi: "33.1",  mjesto: 2},
      { ime: "TIM7", bodovi: "43.5",  mjesto: 3},
    ],
    natjecatelji: [
      { ime: "TIM7"},
      { ime: "TIM6"},
      { ime: "Parizeri"},
    ]
  };

  const templateJSON_EN = {
    poredak: [
      { ime: "TIM6", bodovi: "99.9",  mjesto: 1},
      { ime: "Parizeri", bodovi: "33.1",  mjesto: 2},
      { ime: "TIM7", bodovi: "43.5",  mjesto: 3},
    ],
    natjecatelji: [
      { ime: "TIM7"},
      { ime: "TIM6"},
      { ime: "Parizeri"},
    ]
  };


  const templateJSON = templateJSON_HR;

  const chatCompletion = await openai.chat.completions.create({
    // model: "gpt-4",
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "user",
        content: `Ispiši rezultate natjecanja u JSON formatu kao iz primjera. 
      Pokušaj najbolje što možeš.
  
      ${JSON.stringify(templateJSON, null, 2)}
      `,
      },
      {
        role: "user",
        content: `
      +${text}`,
      },
    ],
    temperature: 0,
    max_tokens: 2048,
  });
  console.log("a", chatCompletion);
  console.log(chatCompletion.choices[0].message);

  let resultObj = {};
  try {
    resultObj = JSON.parse(chatCompletion.choices[0]?.message?.content);
    console.log(resultObj);
  } catch (error) {
    console.log(chatCompletion.choices[0]?.message?.content);
    console.log("Unable to parse!", error);
  }

  return resultObj;
};


export const callChatGPTRaw = async (prompt, text) => {
  const openai = new OpenAI({
    apiKey: process.env.ZAGREBSPORT_AI_SERVICE_PRINCIPAL_OPENAI_KEY, 
  });


  const chatCompletion = await openai.chat.completions.create({
    // model: "gpt-4",
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "user",
        content: `${prompt}`,
      },
      {
        role: "user",
        content: `${text}`,
      },
    ],
    temperature: 0,
    max_tokens: 2048,
  });
  console.log("a", chatCompletion);
  console.log(chatCompletion.choices[0].message);

  let resultObj = {};
  try {
    resultObj = JSON.parse(chatCompletion.choices[0]?.message?.content);
    console.log(resultObj);
  } catch (error) {
    console.log(chatCompletion.choices[0]?.message?.content);
    console.log("Unable to parse!", error);
  }

  return resultObj;
};

export default callChatGPT;
