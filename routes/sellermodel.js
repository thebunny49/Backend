const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sellerAPI');
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SellerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  orderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
//   shopname: {
//     type: String,
//     required: true
// },
// description: {
//     type: String,
    
// },

// fullname: {
//     type: String,
//     required: true
// },
// mobile: {
//     type: Number,
//     required: true
// },


// location:{
//     city:{
//         type:String,
//         required:true
//     },
//     address:{
//         type:String,
//         required:true
//     }
// },
// typeofservice:{
//     type: String,
//     required: true
// }
});
SellerSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
  );
  
SellerSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }
const SellerModel = mongoose.model('seller', SellerSchema);

module.exports = SellerModel;