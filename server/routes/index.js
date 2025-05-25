import { Router } from "express";
import {
  paymentSuccess,
  processPayment,
} from "../controllers/ParkingLotPayment.js";

const razorPayRouter = Router();

razorPayRouter.post("/process-payment", processPayment);

razorPayRouter.post("/payment-success", paymentSuccess);

export default razorPayRouter;
