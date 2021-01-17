var express = require('express');
var router = express.Router();
var Customer = require('./users');
var passport = require('passport');
var passportLocal = require('passport-local');
var clean = require('./seller')

passport.use(new passportLocal(Customer.authenticate()));
/* GET home page. */
router.get('/',redirectToProfile, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register',function(req,res){
  res.render('register')
});

router.post('/register', function(req,res){
  var newuser = Customer({
    name: req.body.name,
    username: req.body.username
  })
  Customer.register(newuser, req.body.password)
  .then(function(registered){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/quickaccess')
    })
  })
})

router.get('/quickaccess',isLoggedIn , function(req,res){
  res.render('quickaccess')
})

router.post('/login',passport.authenticate('local', {
  successRedirect: '/quickaccess',
  failureRedirect:'/index'
}), function(req,res){

})
router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
})
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    req.flash('error', 'You need to Login First!')
    res.redirect('/login')
  }
}
function redirectToProfile(req,res,next){
  if(req.isAuthenticated()){
    res.redirect('/quickaccess')
  }
  else{
    return next();
  }
}
//postman stuff
//
router.post("/cleaning", function(req,res){
  const newclean = new clean(req.body)
  console.log(req.body);
  newclean.save();
})

router.get('/cleaning', async(req,res)=>{
  try{
    const getclean = await clean.find({});
  res.send(getclean);
  }catch(e){
    res.status(400).send(e);
  }
})

//get details by location
router.get('/cleaning/:location', function(req,res){
  clean.find({location: req.params.location})
  .then(function(getindividual){
    res.send(getindividual);
    res.render('cleaning', {getindividual: getindividual})
  })
})

module.exports = router;
