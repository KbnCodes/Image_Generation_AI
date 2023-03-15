import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use('/api/vi/post',postRoutes)
app.use('/api/vi/dalle',dalleRoutes)

app.get("/", async (req, res) => {
  res.send("dalle");
});

app.get("/", async (req, res) => {
  res.send("dalle");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("running in port 8080");
    });
  } catch (err) {
    console.log("🚀 ~ file: index.js:27 ~ startServer ~ err:", err);
  }
};
startServer();
