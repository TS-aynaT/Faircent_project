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
  emailId: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: String,
    required: true,
  },
  panCard: {
    type: Object,
    required: true,
  },
  panNum:{
    type:String
  },
  location: {
    type: String,
  },
  pic: {
    type: String,
  },
  panDetails: {
    type: Array,
  },
  nameCom: {
    type: Number,
  },
  fatherNameCom: {
    type: Number,
  },
  faceMatch: {
    type: String,
  },
});

console.log("in schema");
const User = mongoose.model("User", userSchema);

module.exports = User;
