const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  fullname: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Users", Users);
