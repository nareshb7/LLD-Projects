import { razorPayInstance } from "../index.js";
import crypto from "crypto";

export const processPayment = async (req, res) => {
  try {
    const { amount, receipt } = req.body;
    console.log("body:::", req.body);
    const order = await razorPayInstance.orders.create({
      amount: parseInt(amount * 100), // CENTS
      //   receipt,
      currency: "INR",
    });

    res.status(200).json({ success: true, order, key: process.env.KEY_ID });
  } catch (err) {
    console.log("process_payment_err", err);
    res.status(404).json({ success: false, err });
  }
};

export const paymentSuccess = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = razorpay_signature === expectedSignature;

  if (isAuthentic) {
    res.redirect(
      `http://localhost:1234/LLD-Projects/parking-lot/payment-success?reference=${razorpay_order_id}`
    );
  } else {
    res.status(404).json({
      success: false,
    });
  }
};
