
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sellerAPI');
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user, seller ' ,
      required: true
    },
  });

const orderModel = mongoose.model("Order", orderSchema);
module.exports =  orderModel;