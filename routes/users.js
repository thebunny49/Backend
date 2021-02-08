var mongoose =  require('mongoose');
var plm =require('passport-local-mongoose');
mongoose.connect('mongodb://localhost:27017/customerAPI', { useNewUrlParser: true },{ useUnifiedTopology: true });

var customerSchema = mongoose.Schema({
  name: String,
  username: String,
  password: String,
  location: {
    type: mongoose.Schema.Types.ObjectId,
  },
  // location ko object bnana h

})

customerSchema.plugin(plm);

module.exports = mongoose.model('Customer', customerSchema)