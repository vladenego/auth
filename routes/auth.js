var express = require('express')
const bcrypt = require('bcrypt');
var router = express.Router()
const {registerValidation} = require('../validation')

// IMPORT SCHEMAS
 const User = require('../model/User')

 
router.post('/register', async (req,res) => {

  // WE NEED TO VALIDATE THE DATA FROM USER
  const {error} = registerValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  //CHECK IF THE USER IS ALREADY IN DARABASE BY USERNAME
  const usernameExist = await User.findOne({username: req.body.username})
  if (usernameExist) return res.status(400).send('this username is already exist')

  // CHECK IF THE USER IS ALREADY IN DATABASE
  const emailExist = await User.findOne({email: req.body.email})
  if (emailExist) return res.status(400).send('this email is already exist')


  // HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
  //CREATE A NEW USER
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  })

  try{
    const savedUser = await user.save()
    res.send(savedUser)
  } catch(err){
    res.status(400).send(err)
  }
   
})

router.post('/login', (req,res) => {
  res.send('login page')
})

module.exports = router
