const route = require("express").Router();
const mysql = require("../model/user");
const fun = require("../controller/func");
const multer = require("multer");
const con = require("../model/user");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("../model/conn");
const User = require("../model/mongoUser");

console.log("in route");

route.post("/search", (req, res) => {
  var data = req.body;
  fun.checkData(data, res);
});

const upload = multer({
  dest: "/home/tanyasharma/project/react_app/src/uploads",
});
const file = upload.fields([
  { name: "userPanCard", maxCount: 1 },
  { name: "uImg", maxCount: 1 },
]);

route.post("/test");

route.post("/Register", file, async (req, res) => {
  console.log("In register");
  const userEntry = {
    name: req.body.userName,
    fatherName: req.body.fatherName,
    userPan: req.files["userPanCard"],
    address: req.body.address,
  };

  console.log(userEntry);
  var panPath = userEntry.userPan[0].path;
  console.log(panPath);
  fun.AddDetails(userEntry, res);
});

route.get("/table", (req, res) => {
  console.log("in backend");
  var sql = "select * from PanData;";
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
});

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
module.exports = route;
