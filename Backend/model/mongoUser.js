const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  panCard: {
    type: Object,
    required: true,
  },
  location: {
    type: String,
  },
  pic: {
    type: String,
  },
  panDetails: {
    type: Object,
  },
  nameCom: {
    type: Number,
  },
  fatherNameCom: {
    type: Number,
  },
  faceMatch:{
    type:String
  }
});

console.log("in schema");
const User = mongoose.model("User", userSchema);

module.exports = User;
