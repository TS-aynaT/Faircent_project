const id_analyse = require("idanalyzer");
require("dotenv").config();

const key = process.env.ID_KEY;

let CoreAPI = new id_analyse.CoreAPI("1whPPKOrlr7IIGUrwJDl2DvqVAv2Rzz3", "US");
CoreAPI.enableAuthentication(true, 2);
const faceread = async (panPath, pic) => {
  console.log(panPath, "hhhhhhhhhhhhh");

  return await CoreAPI.scan({
    document_primary: panPath,
    biometric_photo: pic,
  })
    .then((res) => {
      if (!res.error) {
        console.log("in response");
        let face_result = res["face"];
        let authentication_result = res["authentication"];
        if (authentication_result) {
          if (authentication_result["score"] > 0.5) {
            console.log("The document uploaded is authentic");
          } else {
            console.log("The document uploaded is fake");
          }
        }
        // console.log(res);
        if (face_result) {
          if (face_result["isIdentical"]) {
            console.log("Biometric verification PASSED!");
          } else {
            console.log("Biometric verification FAILED!");
          }
          console.log(
            "Confidence Score: " + face_result["confidence"] * 100 + "%"
          );
          return "Confidence Score: " + face_result["confidence"] * 100 + "%";
        }
      }
    })
    .catch((err) => {
      console.log("in error");
      console.log(err);
    });
};

module.exports = { faceread };
