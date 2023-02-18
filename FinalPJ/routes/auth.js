const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../model/user')
const Storage = require('../model/storage')

router.post('/register', async (req, res) => {
  const { username, password, name } = req.body;

  // simple validation
  // if (!name || !username || !password) {
  //   return res.render('register', { message: 'Please try again' });
  // }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = new User({
    name,
    username,
    password: passwordHash
  });

  const storage = new Storage({
    pic: name,
    itemname: username,
    amount: password
  });
  // await user.save();
  await storage.save();
  res.render('index', { user });
});

router.post('/login', async (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;

  const user = await User.findOne({
    username
  });

  if (user) {
    const isCorrect = bcrypt.compareSync(password, user.password);

    if (isCorrect) {
      return res.render('index', { user });

    } else {
      return res.render('login', { message: 'Username or Password incorrect' });
    }
  } else {
    return res.render('login', { message: 'User not found.' });
  }
  
});


router.post('/adminlogin', async (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;
  const adminName = "Saris Bua-iem"
  const adminUser = "zoomadmin"
  const adminPassword = "12345"

  

  if (username == adminUser && password == adminPassword) {
    return res.render('adminindex', { admin:adminName });
  } else {
    return res.render('adminlogin', { message: 'Username or Password incorrect' });
  }
  
});


router.post('/adminIndex', async (req, res) => {
  const { username, password, name } = req.body;

  // simple validation
  // if (!name || !username || !password) {
  //   return res.render('register', { message: 'Please try again' });
  // }

  const storage = new Storage({
    pic: name,
    itemname: username,
    amount: password
  });
  // await user.save();
  await storage.save();
  res.render('index', { user });
});



module.exports = router;
