var express = require('express');
var router = express.Router();

const Storage = require('../model/storage')

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  }
  next();
};

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' , user: req.user });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/adminlogin', (req, res) => {
  res.render('adminlogin');
});

router.get('/index', (req, res) => {
  res.render('index');
});

router.get('/adminIndex', (req, res) => {
  res.render('adminIndex', { admin: nameAdmin });
  // res.render('adminIndex');
});

router.get('/storage', (req, res) => {

  Storage.find({},function(err, store){
    res.render('storage', { admin: nameAdmin,
      listStorage: store
     });
  })
  // res.render('storage');
});

router.get('/ustorage', (req, res) => {

  Storage.find({},function(err, store){
    res.render('ustorage', { nameUser,
      listStorage: store
     });
  })
});

router.get('/logout', (req, res) => {
  // req.session.destroy();
  res.redirect('/login');
});



// router.get('/adminregister', (req, res) => {
//   res.render('adminregister');
// });

module.exports = router;
