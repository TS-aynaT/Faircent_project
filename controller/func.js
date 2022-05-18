const readPan = require("./readPan");
const con = require("../model/user");
const panAuth = require("../controller/auth");
const mongoose = require("mongoose");
require("../model/conn");
const string_com = require("string-similarity");
const User = require("../model/mongoUser");

const checkData = (data, res) => {
  console.log("in search log");
  console.log(data);
  var s1 = "select count(Sno) as len from PanData";
  con.query(s1, (err, result1) => {
    if (err) throw err;
    var len = result1[0].len;
    console.log(len, "length");
    var sql = "select PanCard, DOB from PanData";
    con.query(sql, (err, result) => {
      if (err) throw err;
      var found = 0;
      for (var i = 0; i < len; i++) {
        if (
          result[i].PanCard === data.panCard &&
          result[i].DOB === data.passWord
        ) {
          found = 1;
          console.log("found match");
          break;
        }
      }
      if (found == 1) {
        console.log("found");
        res.status(201).json("Found");
      } else {
        console.log(found);
        console.log("Not Verified");
        res.status(401).json("Not Found");
      }
    });
  });
};

const AddDetails = async (user, res) => {
  // const { name, fatherName, panCard } = user;
  var name = user.name;
  var fName = user.fatherName;
  var userPan = user.userPan;
  var address = user.address;

  let panPath = userPan[0].path;
  console.log(panPath, "pathhhhh");
  let details = await readPan(panPath);
  console.log(details, "details from Pancard");

  await User.findOne({ Name: name } && { fname: fName }).then(
    async (ifexist) => {
      if (ifexist) return res.status(404).json("user Exists ");

      let id = mongoose.Types.ObjectId();
      const newUser = new User({
        _id: id,
        Name: name,
        fname: fName,
        panCard: userPan,
        location: address,
        panDetails: details,
      });

      // console.log(panPath);
      console.log(id);
      await newUser
        .save()
        .then(() => {
          res.status(200).json({
            userId: id,
            pan_Path: panPath,
            msg: "Data is added",
          });
          console.log("Data saved in Mongo");
        })
        .catch((err) => {
          res.status(404).json({
            msg: "User Already Exists",
          });
        });
    }
  );
};

const AddImg = async (data, res) => {
  var id = data.uID;
  console.log(id);
  // console.log(data, "data from cameraaaaaaaa");

  var doc = await User.findById(id);
  console.log(doc);
  var pan_Path = doc.panCard[0].path;
  var panCard = doc.panDetails.pc;
  var dob = doc.panDetails.dob;

  console.log(pan_Path, "document");
  var faceResult = await panAuth.faceread(pan_Path, data.uImg);
  console.log(faceResult, "jjjjjjjjjjjj");
  console.log("after faceread");
  await toCompareQui(id);
  return await User.findOneAndUpdate(
    { _id: id },
    {
      faceMatch: faceResult,
      pic: data.uImg,
    }
  )
    .then(() => {
      console.log("here in then");
      return res.status(200).json({
        userId: id,
        pc: panCard,
        dob: dob,
        msg: "Pic Saved",
      });
    })
    .catch((err) => {
      console.log("in updation error");
      res.status(404).json({
        msg: "User Not Found",
        error: err,
      });
    });
};

const toCompareQui = async (id) => {
  var doc = await User.findById(id);
  console.log(doc, "data from toCompareQu.....");
  var uname = doc.Name.toLowerCase();
  var fname = doc.fname.toLowerCase();
  var panName = doc.panDetails.name.toLowerCase();
  var panfname = doc.panDetails.fname.toLowerCase();

  // var luname = uname.toLowerCase()

  // console.log(uname, "uname");
  // console.log(fname, "fname");
  // console.log(panName, "panuname");
  // console.log(panfname, "panfname");

  var r1 = Math.floor(string_com.compareTwoStrings(uname, panName) * 100);
  var r2 = Math.floor(string_com.compareTwoStrings(fname, panfname) * 100);

  // console.log(r1, "name comaprision");

  // console.log(r2, "fathers name comaprision");

  await User.findByIdAndUpdate({ _id: id }, { nameCom: r1, fatherNameCom: r2 })
    .then(() => {
      console.log("Matching doneeeeee");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { AddImg, checkData, AddDetails };
