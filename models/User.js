var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  birthday: { type: String },
  email: String,
  favoriteColor: String,
  id: String,
  image: String,
  joinDate: { type: String, default: Date.now },
  name: String,
  username: String
});

module.exports = mongoose.model('User', UserSchema);
