var express = require('express');
var router = express.Router();
var Customer = require('./users');
var passport = require('passport');
var passportLocal = require('passport-local');
var clean = require('./clean');
var beauty = require('./beauty')

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
//seller post services 
router.post("/cleaning", function(req,res){
  const newclean = new clean(req.body)
  console.log(req.body);
  newclean.save();
})
//get all services detail
router.get('/cleaning', async(req,res)=>{
  try{
    const getclean = await clean.find({});
  res.send(getclean);
  }catch(e){
    res.status(400).send(e);
  }
})
//individual seller from customer side
router.get('/cleaning/:id', function(req,res){
  clean.findById(req.params.id)
  .then(function(getindi){
    res.send(getindi);
    res.render('cleaning', {getindi: getindi})
  })
})
//get services details by location
router.get('/cleaning/:location', function(req,res){
  clean.find({location: req.params.location})
  .then(function(getindividual){
    res.send(getindividual);
    res.render('cleaning', {getindividual: getindividual})
  })
})

//BEAUTY SiDE
//seller post services 
router.post("/beauty", function(req,res){
  const newbeauty = new beauty(req.body)
  console.log(req.body);
  newbeauty.save();
})
//get all services detail
router.get('/beauty', async(req,res)=>{
  try{
    const getbeauty = await beauty.find({});
  res.send(getbeauty);
  }catch(e){
    res.status(400).send(e);
  }
})
//individual seller from customer side
router.get('/beauty/:id', function(req,res){
  beauty.findById(req.params.id)
  .then(function(getindi){
    res.send(getindi);
    res.render('beauty', {getindi: getindi})
  })
})
//get services details by location
router.get('/beauty/:location', function(req,res){
  beauty.find({location: req.params.location})
  .then(function(getindividual){
    res.send(getindividual);
    res.render('cleaning', {getindividual: getindividual})
  })
})
router.post('/beauty/booknow/:location',function(req,res){
  Customer.find({location: req.params.location})
  .then(function(done){
    res.send("its in progress")
  })

})
module.exports = router;
