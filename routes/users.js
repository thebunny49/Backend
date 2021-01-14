var mongoose =  require('mongoose');

mongoose.connect('mongodb://localhost:27017/restAPI', { useNewUrlParser: true },{ useUnifiedTopology: true });

var articleSchema = mongoose.Schema({
  title:String,
  content: String
})
module.exports = mongoose.model('Article', articleSchema)