const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const PORT = 5000;

app.use(express.static(__dirname + "/src"));
app.use(express.json());

const configuration = new Configuration({
  apiKey: "",
});

// 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

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
          content: "Assume you are comedian and reply only funny answers",
        },
      ],
      temperature: 0.2,
      max_tokens: 300,
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
