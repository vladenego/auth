const express = require('express');
const verify = require('./verifyToken')
var router = express.Router()


router.get('/',verify, (req,res) => {
  res.json({
    post: {
      title: 'This is 1 post', 
      description: 'loremwqeqwe eqw e e qwe qw e eqw ewq ewq eqweqdskl dkf vfwk'}
  })

  res.send(posts)
})


module.exports = router
