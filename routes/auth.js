var express = require('express')
var router = express.Router()
const {registerValidation} = require('../validation')

// IMPORT SCHEMAS
 const User = require('../model/User')

 
router.post('/register', async (req,res) => {

  // WE NEED TO VALIDATE THE DATA FROM USER
  const {error} = registerValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  //CHECK IF THE USER IS ALREADY IN DARABASE BY USERNAME

  // CHECK IF THE USER IS ALREADY IN DATABASE
  const emailExist = await User.findOne({email: req.body.email})
  if (emailExist) return res.status(400).send('this email is already exist')

  //CREATE A NEW USER
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
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
