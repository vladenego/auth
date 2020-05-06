var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 6
  },
  email: {
    type: String,
    max: 255,
    min: 6,
    required: true
  },
  password: {
      type: String,
      required: true,
      max: 1024,
      min: 6
  },
  date: {
    type:  Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);


