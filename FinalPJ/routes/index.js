var express = require('express');
var router = express.Router();

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

router.get('/storage', (req, res) => {
  res.render('storage');
});

module.exports = router;
