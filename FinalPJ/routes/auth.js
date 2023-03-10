const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../model/user')
const Admin = require('../model/admin')
const Storage = require('../model/storage')
const BorrowStorage = require('../model/borrowstorage')


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

  nameUser = user

  await user.save();

  res.render('index', { nameUser });
});

// router.post('/adminregister', async (req, res) => {
//   const { username, password, name } = req.body;

//   const passwordHash = bcrypt.hashSync(password, 10);
//   const admin = new Admin({
//     name,
//     username,
//     password: passwordHash
//   });

//   nameAdmin = admin

//   await admin.save();

//   return res.render('adminIndex', { admin: nameAdmin });
// });

router.post('/login', async (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;

  const user = await User.findOne({
    username
  });

  nameUser = user
  if (user) {
    const isCorrect = bcrypt.compareSync(password, user.password);

    if (isCorrect) {
      return res.render('index', { nameUser });

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

  const admin = await Admin.findOne({
    username,
    password
  });

  nameAdmin = admin

  if (admin) {
    return res.render('adminIndex', { admin: nameAdmin});
  } else {
    return res.render('adminlogin', { message: 'Username or Password incorrect' });
  }

  
});

// router.post('/adminlogin', async (req, res) => {
//   console.log(req.body);

//   const { username, password } = req.body;
//   adminName = "Saris Bua-iem" //global
//   const adminUser = "zoomadmin"
//   const adminPassword = "12345"

  

//   if (username == adminUser && password == adminPassword) {
//     return res.render('adminIndex', { admin: adminName });
//   } else {
//     return res.render('adminlogin', { message: 'Username or Password incorrect' });
//   }
  
// });


router.post('/addIndex', async (req, res) => {
  const { itempic, itemname, itemamount } = req.body;

  // Check if any required fields are missing
  if (!itempic || !itemname || !itemamount) {
    return res.status(400).send('กรุณากรอกข้อมูลให้ครบ');
  }

  // Check 
  const sameItem = await Storage.findOne({ pic: itempic, name: itemname });

  if (sameItem) {
    // Update 
    sameItem.amount += parseInt(itemamount);

    if (sameItem.amount == 0) {
      await sameItem.delete()
    }
    // else if (sameItem.amount < 0) {
    //   return res.status(400).send('กรุณากรอกข้อมูลให้ถูกต้อง');

    // }
    else {
      await sameItem.save();
    }

  } 
  else {
    const storage = new Storage({
      pic: itempic,
      name: itemname,
      amount: itemamount
    });

    await storage.save();
  }

  return res.render('adminIndex', { admin: nameAdmin });
});


router.post('/borrowIndex', async (req, res) => {
  const { itemname, itemamount } = req.body;

  // Check missing
  // if (!itempic || !itemname || !itemamount) {
  //   return res.status(400).send('กรุณากรอกข้อมูลให้ครบ');
  // }

  // Check 
  // const sameItem = await BorrowStorage.findOne({name: itemname});
  const sameItem = await BorrowStorage.findOne({Nameuser : nameUser.name , name: itemname});
  const storageItem = await Storage.findOne({ name: itemname });

  if (sameItem) {
    // Update 
    sameItem.amount += parseInt(itemamount);

    storageItem.amount -= parseInt(itemamount);
    await storageItem.save();

    if (sameItem.amount == 0 ) {
      await sameItem.delete();
    }
    else if (storageItem.amount < 0) {
      storageItem.amount += parseInt(itemamount);
      await storageItem.save();

      return res.status(400).send('กรุณากรอกข้อมูลให้ถูกต้อง');

    }
    else {
      await sameItem.save();
    }
    
  } 
  else {
    const borrowstorage = new BorrowStorage({
      Nameuser: nameUser.name,
      name: itemname,
      amount: itemamount
    });

    storageItem.amount -= parseInt(itemamount);
    await storageItem.save();
    await borrowstorage.save();
  }

  return res.render('index');
});


module.exports = router;
