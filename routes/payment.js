// const express = require('express');
// const router = express.Router();
// const Razorpay = require('razorpay');
// const crypto = require('crypto');

// // Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // Create order route
// router.post('/create-order', async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const options = {
//       amount: amount * 100, // amount in the smallest currency unit
//       currency: 'INR',
//       payment_capture: '1'
//     };
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Verify payment route
// router.post('/verify-payment', (req, res) => {
//   const { order_id, payment_id, signature } = req.body;
//   const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//     .update(order_id + "|" + payment_id)
//     .digest('hex');

//   if (generated_signature === signature) {
//     res.json({ success: true });
//   } else {
//     res.status(400).json({ success: false });
//   }
// });

// module.exports = router;
