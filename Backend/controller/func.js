const readPan = require("./readPan");
const con = require("../model/user");
const panAuth = require("../controller/auth");
const mongoose = require("mongoose");
require("../model/conn");
const string_com = require("string-similarity");
const User = require("../model/mongoUser");

// const checkData = (data, res) => {
//   console.log("in search log");
//   console.log(data);
//   var s1 = "select count(Sno) as len from PanData";
//   con.query(s1, (err, result1) => {
//     if (err) throw err;
//     var len = result1[0].len;
//     console.log(len, "length");
//     var sql = "select PanCard, DOB from PanData";
//     con.query(sql, (err, result) => {
//       if (err) throw err;
//       var found = 0;
//       for (var i = 0; i < len; i++) {
//         if (
//           result[i].PanCard === data.panCard &&
//           result[i].DOB === data.passWord
//         ) {
//           found = 1;
//           console.log("found match");
//           break;
//         }
//       }
//       if (found == 1) {
//         console.log("found");
//         res.status(201).json("Found");
//       } else {
//         console.log(found);
//         console.log("Not Verified");
//         res.status(401).json("Not Found");
//       }
//     });
//   });
// };

const AddDetails = async (user, res) => {
  // const { name, fatherName, panCard } = user;
  var name = user.name;
  var fName = user.fatherName;
  var userPan = user.userPan;
  var address = user.address;
  var emailId = user.emailId;
  var phoneNum = user.phoneNum;

  let panPath = userPan[0].path;
  console.log(panPath, "pathhhhh");
  let details = await readPan(panPath);
  console.log(details, "details from Pancard");
  var panNum = details.pc;

  await User.findOne( {panNum:panNum}).then(
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
        phoneNum: phoneNum,
        emailId: emailId,
        panNum:panNum
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
  var pan_Path = doc.panCard[0].path; //pancard Path
  var panCard = doc.panDetails[0].pc; //PanCard Number
  var faceResult = await panAuth.faceread(pan_Path, data.uImg);
  console.log(faceResult, "Face Result");
  console.log("after faceread");
  await toCompareQui(id);
  var dob = doc.panDetails[0].dob;
  await User.findOneAndUpdate(
    { _id: id },
    {
      faceMatch: faceResult,
      pic: data.uImg,
    }
  )
    .then(() => {
      console.log(data);
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
  var panName = doc.panDetails[0].name.toLowerCase();
  var panfname = doc.panDetails[0].fname.toLowerCase();

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
module.exports = { AddImg, AddDetails };
