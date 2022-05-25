import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
// import {Image} from "react-native";

const userData = {
  name: "",
  fname: "",
  location: "",
};

export default function DashBoard() {
  const [details, setDetails] = useState();
  const [isVisible, setIsVisible] = useState(false);
  // axios.get("/ShowData",details);
  var panCard = useParams();

  useEffect(() => {
    console.log("working");
    // userDetails();
    findPan();
  }, []);

  // const userDetails = async () => {
  //   await fetch("http://localhost:3005/ShowData")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("data++++++++++++++++++++", data);
  //       findPan();
  //       // console.log(details, "------------");
  //     });

  // };
  var data = "";

  const findPan = async () => {
    await axios
      .post("/fetchdata", panCard)
      .then((res) => {
        console.log(res.data, "data from axios");

        var d = res.data;
        data = d;

        setDetails(d);
        console.log("data is updates", details);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsVisible(true);
  };
  const createPdf = () => {
    console.log(details, "deails in create pdf");
    var doc = new jsPDF("p", "pt", "a4");
    doc.html(
      document.querySelector(".dashboard", {
        callback: function (pdf) {
          pdf.save("result.pdf");
        },
      })
    );
    // axios.post("/getpdf",details)
    // .then(()=>{
    //   axios.get("savepdf",{responseType:"blob"})
    //   .then();
    // });
  };

  return (
    <>
      <Navbar />
      {isVisible ? (
        <div className="container dashboard">
          <div className="form-group">
            <div className="row bg-white">
              <div className="col-md-12 d-flex justify-content-center">
                <h3> User Details</h3>
              </div>
            </div>
            <div className="row border bg-white mb-2">
              <div className="col-md-6">
                {/* <ul class="list-group">
                <li class="list-group-item">{details[0].Name}</li>
                <li class="list-group-item">{details[0].fname}</li>
                <li class="list-group-item">{details[0].location}</li>
              </ul> */}
                <div className="row border mt-2">
                  <div className="col-md-12 mt-2 mb-2 Display 3">
                    <label>
                      <i class="bi bi-person" />
                      Name: {details[0].Name}
                    </label>
                  </div>
                </div>
                <div className="row border Display 3 mt-2 mb-2">
                  <div className="col-md-12  mt-2 mb-2">
                    <label>Father's Name: {details[0].fname}</label>
                  </div>
                </div>
                <div className="row border Display 3 mt-2 mb-2">
                  <div className="col-md-12  mt-2 mb-2">
                    <label>Email ID: {details[0].emailId}</label>
                  </div>
                </div>
                <div className="row border Display 3 mt-2 mb-2">
                  <div className="col-md-12  mt-2 mb-2 ">
                    <label>Contact Number:{details[0].phoneNum}</label>
                  </div>
                </div>
                <div className="row border Display 3 mb-2 ">
                  <div className="col-md-12  mt-2 mb-2">
                    <label>
                      Current location:
                      {details[0].location}
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-5 pb-3">
                <img
                  className="rounded-circle w-75 h-100 pl-1"
                  src={details[0].pic}
                ></img>
              </div>
            </div>
            {/* ***************************************************** */}
            <div className="row bg-white mb-2">
              <div className="col-md-12 d-flex justify-content-center">
                <h3>Pan Details</h3>
              </div>
              <div className="col-md-6">
                <div className="row border Display 3 mb-2 ">
                  <div className="col-md-12  mt-2 mb-2">
                    <label>{details[0].panDetails[0].pc}</label>
                  </div>
                </div>
                <div className="row border Display 3 mb-2 ">
                  <div className="col-md-12  mt-2 mb-2">
                    <label>{details[0].panDetails[0].name}</label>
                  </div>
                </div>
                <div className="row border Display 3 mb-2 ">
                  <div className="col-md-12  mt-2 mb-2">
                    <label>{details[0].panDetails[0].fname}</label>
                  </div>
                </div>
                <div className="row border Display 3 mb-2 ">
                  <div className="col-md-12  mt-2 mb-2">
                    <label>{details[0].panDetails[0].dob}</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <center>
                    <label>
                      <img
                        className="w-75 h-75 ml-3 md-5"
                        src={require(`/home/tanyasharma/project/react_app/src/uploads/${details[0].panCard[0].filename}`)}
                      ></img>
                    </label>
                  </center>
                </div>
              </div>
            </div>
            {/* ***************************************************** */}

            <div className="row bg-white">
              <div className="col-md-12">
                <div className="col-md-12 d-flex justify-content-center">
                  <h3> % Match</h3>
                </div>
                <div className="row border mt-2">
                  <div className="col-md-12 mt-2 mb-2 Display 3">
                    <label>Face Match: {details[0].faceMatch}</label>
                  </div>
                </div>
                <div className="row border mt-2">
                  <div className="col-md-12 mt-2 mb-2 Display 3">
                    <label>User Name Match %: {details[0].nameCom}</label>
                  </div>
                </div>
                <div className="row border mt-2">
                  <div className="col-md-12 mt-2 mb-2 Display 3">
                    <label>
                      Father Name Match %: {details[0].fatherNameCom}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <center>
            <button onClick={createPdf} className="btn btn-primary mt-3 mb-0">
              Print
            </button>
          </center>
        </div>
      ) : null}
    </>
  );
}
