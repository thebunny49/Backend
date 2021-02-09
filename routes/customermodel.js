const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/database');
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserSchema = new Schema({
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
    
  },
  name: {
    type: String,
    
  },
  mobile: {
    type: String,
    
  },
  location: {
    type: String,
    
  },
  userAPi:{
    type: String
  }
});
UserSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
  );
  
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;