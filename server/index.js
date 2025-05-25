import express from "express";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import razorPayRouter from "./routes/index.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 1111;
export const razorPayInstance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", razorPayRouter);

app.listen(PORT, () => {
  console.log("Server is running...");
});
