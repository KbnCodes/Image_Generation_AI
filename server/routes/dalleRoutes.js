import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();
const configuration = new Configuration({ apiKey: process.env.OPENAI_API });

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("DALL-E");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    // console.log("🚀 ~ file: dalleRoutes.js:25 ~ router.route ~ aiResponse:", aiResponse)
    const image = aiResponse.data.data[0].b64_json;
    // console.log("🚀 ~ file: dalleRoutes.js:27 ~ router.route ~ image:", image)

    res.status(200).json({ photo: image });
  } catch (err) {
    // console.log("🚀 ~ file: dalleRoutes.js:29 ~ router.route ~ err:", err);
    res.status(500).send(err?.response.data.error.message);
  }
});

export default router;
