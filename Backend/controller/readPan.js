const tesseract = require("node-tesseract-ocr");

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
};
var name = "";
var fname = "";
var pc = "";
var dob = "";
const readDoc = async (pa) => {
  return await tesseract
    .recognize(`${pa}`, config)
    .then(async (text) => {
      var rs = text.split("\n");

      for (var i = 0; i < rs.length; i++) {
        if (rs[i] == "" || rs[i] == " " || rs[i] == "  " || rs[i] == "   ") {
          // console.log(rs[i], i);
          rs.splice(i, 1);
          i--;
        }
      }

      for (var i = 0; i < rs.length; i++) {
        var re = RegExp("([A-Z]){5}([0-9]){4}([A-Z]){1}");
        if (re.test(rs[i])) {
          pc = rs[i]; //pancard
        }
        if (rs[i].includes("irth")) {
          b = rs[i + 1];
          var c = b.split(" ");
          dob = c[0]; //date of birth
        }
        if (rs[i].includes("ther")) {
          name = rs[i - 1]; //User_name
          fname = rs[i + 1]; //Father's Name
        }
      }
      return { pc, dob, name, fname };

      //   var d = await authr.isVerified(pa);
      //   console.log(d);
      //   if (d == "true") {
      //     var sql =
      //       "Insert into PanData (PanCard,Name,FName,DOB,Authorized_By) values (?,?,?,?,?)";
      //     con.query(sql, [pc, name, fname, dob, d], (err) => {
      //       if (err) throw err;
      //       console.log("Data Added");
      //     });
      //     return "true";
      //   } else {
      //     console.log("false");
      //     return "false";
      //   }
    })
    .catch((error) => {
      console.log(error.message);
    });
};
module.exports = readDoc;
