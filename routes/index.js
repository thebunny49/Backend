var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var Customer = require('./users');
var passport = require('passport');
var passportLocal = require('passport-local');
const seller = require('./sellermodel');
const order = require('./orderModel');
const UserModel = require('./customermodel');
const SellerModel = require('./sellermodel');
passport.use(new passportLocal(Customer.authenticate()));
/* GET home page. */
router.get('/',redirectToProfile, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register',function(req,res){
  res.render('register')
});

router.post(
  '/user/register',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.get('/quickaccess',isLoggedIn , function(req,res){
  res.render('quickaccess')
})

router.post(
  '/user/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');
              // UserModel.find({_id: body._id})
              // .then(function(_id){
              //   console.log(_id)
              //   console.log(token)
              // })
              console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>..");
              console.log(token);
              await UserModel.findOneAndUpdate({_id:body._id},{$set:{userAPi:token}}, {new:true},function(err, user) {
                console.log(err);
                console.log(user);
                return res.status(400).send({
                    message: "Response Update Successfully" ,
                    data: user
                })
              })
              // console.log(token)
              // console.log(body._id)
            
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

//SELLER SIDE LOGIN SIGNUP
router.post(
  '/seller/register',
  passport.authenticate('sellerSignUp', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.post(
  '/seller/login',
  async (req, res, next) => {
    passport.authenticate(
      'sellerLogin',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');
              // UserModel.find({_id: body._id})
              // .then(function(_id){
              //   console.log(_id)
              //   console.log(token)
              // })
              //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>..");
              //console.log(token);
              await SellerModel.findOneAndUpdate({_id:body._id},{$set:{userAPi:token}}, {new:true},function(err, user) {
                //console.log(err);
                //console.log(user);
                return res.status(400).send({
                    message: "Response Update Successfully" ,
                    data: user
                })
              })
              // console.log(token)
              // console.log(body._id)
            
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);
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
  UserModel.findById(req.params.id)
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

router.post('/user/editProfile/:userAPi', function(req,res){
  UserModel.findOneAndUpdate({userAPI: req.params.token},{
    email: req.body.email,
    name: req.body.name,
    mobile: req.body.mobile,
    location: req.body.location
  }, {new:true})
  .then(function(user){
    console.log(user.location)
    
    res.send('correct');
  })
})

// router.post('/seller/editProfile/:userAPi', function(req,res){
//   SellerModel.findOneAndUpdate({userAPi: req.params.token},{
//     email: req.body.email,
//     name: req.body.name,
//     mobile: req.body.mobile,
//     location: req.body.location
//   }, {new:true})
//   .then(function(data){
//     console.log(data)
    
//     res.send('correct');
//   })
// })
router.post ('/seller/editProfile/:userAPi',async function(req,res){
  console.log("agubai",req.body);
  // {userAPi:req.params.userAPi}
  // return await SellerModel.create({
  //   email:'gg',
  //   password:'gg'

  // }).then((response)=>{
  //   console.log(response)
  //   return res.send({
  //      message:"makachu bete",
  //      data:response
  //    })
  //  })

 await SellerModel.findOneAndUpdate({userAPi:req.params.userAPi},{$set:{
    email: req.body.email,
    name: req.body.name,
    mobile: req.body.mobile,
    location: req.body.location
  }}, {new:false},function(err, user) {
 
    return res.status(200).send({
        message: "Response Update Successfully" ,
        data: user,
       

    })
  })


})

// router.get('/cleaning/booknow', function(req,res){
//   clean.find({api: req.params.api})
//   .then(function(found){
//     res.send(found)
//   })
// });

router.post("/order/:id", async (req, res) => {
  order.find({typeof: req.params.typeof})
  const newOrder = new Order({
    
    name: req.body.name,
    user: req.user._id,
    location: req.body.location,
    orderID: req.orderID,
    
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({ message: "New Order Created", data: newOrderCreated });
});

router.post('/user/allService/:userAPi', function(req,res){
  UserModel.find({userAPI: req.params.userAPi})
  .then(function(user){
    return SellerModel.find().where({userAPi: userAPi}).then((location)=>{
         console.log(location)
         return res.send({
            message:"agubai",
            data:location
          })
        })
  })
})

// //BEAUTY SiDE
// //seller post services 
// router.post("/beauty", function(req,res){
//   const newbeauty = new beauty(req.body)
//   console.log(req.body);
//   newbeauty.save();
// })
// //get all services detail
// router.get('/beauty', async(req,res)=>{
//   try{
//     const getbeauty = await beauty.find({});
//   res.send(getbeauty);
//   }catch(e){
//     res.status(400).send(e);
//   }
// })
// //individual seller from customer side
// router.get('/beauty/:id', function(req,res){
//   beauty.findById(req.params.id)
//   .then(function(getindi){
//     res.send(getindi);
//     res.render('beauty', {getindi: getindi})
//   })
// })
// //get services details by location
// router.get('/beauty/:location', function(req,res){
//   beauty.find({location: req.params.location})
//   .then(function(getindividual){
//     res.send(getindividual);
//     res.render('cleaning', {getindividual: getindividual})
//   })
// })
// router.post('/booknow/:',function(req,res){
//   Customer.find({location: req.params.location})
//   .then(function(done){
//     res.send("its in progress")
//   })

// })
module.exports = router;
