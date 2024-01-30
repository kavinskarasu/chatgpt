const express = require("express");
const app = express();
const OpenAI = require("openai");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const openai = new OpenAI({
  apiKey: process.env.API,
});

app.post("/", async (req, res) => {
  let question =
    req.body.data + " " + "give only max two line question from above scenario";
  //console.log(req.body);
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: question }],
    max_tokens: 100,

    model: "gpt-3.5-turbo",
  });
  const data = completion.choices[0].message.content;
  res.status(200).json({
    status: "success",
    data,
  });
});
app.post("/answer", async (req, res) => {
  let question = req.body.data;
  console.log(question);
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: question }],
    max_tokens: 100,

    model: "gpt-3.5-turbo",
  });
  const data = completion.choices[0].message.content;
  res.status(200).json({
    status: "success",
    data,
  });
});

app.listen(3000, () => {
  console.log("server is running");
});
