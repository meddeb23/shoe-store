const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email:{
    type: String,
    unique: true,
    required: [true, 'email is required'],
  },
  firstName:{
    type: String,
    trim: true,
    required: [true, "First name is required"]
  },
  lastName:{
    type: String,
    trim: true,
    required: [true, "Last name is required"]
  },
  password:{
    type: String,
    required: [true, 'password is required']
  },
  isAdmin : {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
