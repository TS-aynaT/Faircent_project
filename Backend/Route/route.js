const route = require("express").Router();
const mysql = require("../model/user");
const fun = require("../controller/func");
const multer = require("multer");
const con = require("../model/user");
const fs = require("fs");
const auth = require("../controller/auth");
const path = require("path");
const mongoose = require("mongoose");
require("../model/conn");
const User = require("../model/mongoUser");
const pdf = require("html-pdf");

// const destination = require("../Download");
console.log("in route");

route.post("/search", (req, res) => {
  var pc = req.body.pc;
  var phoneNum = req.body.phoneNum;
  User.find({ panNum: pc, phoneNum: phoneNum }, (err, result) => {
    if (err) throw err;
    // res.send(result);
    res.status(200).json({ msg: true ,
    panCard:pc});
  });
});

const upload = multer({
  dest: "/home/tanyasharma/project/react_app/src/uploads",
});
const file = upload.fields([
  { name: "userPanCard", maxCount: 1 },
  { name: "uImg", maxCount: 1 },
]);

route.post("/Register", file, async (req, res) => {
  console.log("In register");
  const userEntry = {
    name: req.body.userName,
    fatherName: req.body.fatherName,
    userPan: req.files["userPanCard"],
    address: req.body.address,
    emailId: req.body.emailId,
    phoneNum: req.body.phoneNum,
  };

  console.log(userEntry);
  var panPath = userEntry.userPan[0].path;
  console.log(panPath);
  fun.AddDetails(userEntry, res);
});

// route.get("/table", (req, res) => {
//   console.log("in backend");
//   var sql = "select * from PanData;";
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     res.status(200).send(result);
//   });
// });

route.post("/addpic", file, async (req, res) => {
  console.log("in pivccccc");
  let data = req.body;
  //  console.log(data);
  fun.AddImg(data, res);
});

route.get("/ShowData", (req, res) => {
  console.log("showing");
  User.find({}, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
});

route.post("/fetchdata", (req, res) => {
  var panCard = req.body.pc;
  console.log(panCard, "req.body");

  User.find({ panNum: panCard }, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
});
route.post("/Admin", (req, res) => {
  console.log(req.body);
  var uid = req.body.id;
  var upass = req.body.pass;
  var istrue = auth.loginAdmin(uid, upass);
  if (istrue == "true") {
    res.status(200).json({ msg: "true" });
  } else {
    res.status(200).json({ msg: "false" });
  }
});
// route.post("/getpdf", (req, res) => {
//   var data = req.body;
//   console.log(data, "from frontend");
//   pdf.create(destination(data), {}).toFile("result.pdf", (err) => {
//     if (err) {
//       return Promise.reject();
//     } else {
//       return Promise.resolve();
//     }
//   });
// });

// route.get("savepdf", (req, res) => {
//   res.sendFile(`${__dirname}/result.pdf`);
// });
module.exports = route;
