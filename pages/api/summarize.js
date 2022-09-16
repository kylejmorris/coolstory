const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async (req, res) => {
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    console.log(req.body['prompt'])

    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: "Shorten this paragraph into 1 simple sentence\n\n" + req.body.prompt + "\n",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).json({text: `${response.data.choices[0].text}`})
}