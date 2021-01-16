var mongoose =  require('mongoose');
var plm =require('passport-local-mongoose');
mongoose.connect('mongodb://localhost:27017/customerAPI', { useNewUrlParser: true },{ useUnifiedTopology: true });

var customerSchema = mongoose.Schema({
  name: String,
  username: String,
  password: String,
  location: String
})

customerSchema.plugin(plm);

module.exports = mongoose.model('Customer', customerSchema)