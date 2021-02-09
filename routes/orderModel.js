import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user, seller ' ,
      required: true
    },
  });

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;