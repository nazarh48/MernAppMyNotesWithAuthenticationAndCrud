const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { findById } = require('../models/User');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'nazarisagoodb$oy'; // this is algorithm of jwt


// create user using POST on route /api/auth/createuser and no login is required
router.post('/createuser', [
  body('name', 'name should be min of 3 length').isLength({ min: 3 }), //this is from express validator
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password should be of min length 5').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  // check whether the user with this email exists or not
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res.status(400).json({success, error: "user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    user = await User.create({ // here creating in database by User.create
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })


    //jwt is used to verify user 
    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET); // generating auth token of id
    
    success = true;
    res.json({success, authToken })
  } catch (error) {
    res.status(500).send("internal server error occured");
  }
})





// authenticate a user using get on route /api/auth/login and no login is required
router.post('/login', [
  body('email', 'enter a valid email').isEmail(),
  body('password', 'passoword cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // check whether the user with this email exists or not
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email})

    if(!user){
      success = false
      return res.status(400).json({error:"please authenticate using correct credentials"})
    }


    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      success= false
      return res.status(400).json({success, error:"please authenticate using correct credentials"})

    }
 // here id of user id the form of authtoken will be provided
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true
    res.json({ success, authToken })


  }  catch (error) {
    res.status(500).send("internal server error occured");
  }
})


//Route: 3 get user detail at the rout /api/user/getuser and here we are usnign middleware
router.post('/getuser',fetchuser , async (req, res) => {
  try {
    userId = req.user.id; // this id coming from fetchuer middleware
    const user = await User.findById(userId).select('-password');  //without password selecting all other fields
    res.send(user)
  } catch (error) {
    res.status(500).send("internal server error occured");
  }
})




module.exports = router