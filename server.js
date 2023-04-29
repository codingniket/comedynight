const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const PORT = 5000;

app.use(express.static(__dirname + "/src"));
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

app.post("/output", (req, res) => {
  let question = req.body.query;

  async function main(e) {
    let message = { body: e };
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Your name is Drake. You are a helpful assistant.",
        },
        {
          role: "user",
          content:
            "Assume you are comedian and reply with unique jokes everytime",
        },
      ],
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.send(completion.data.choices[0].message.content);
  }

  main(question);
});

app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`);
});
