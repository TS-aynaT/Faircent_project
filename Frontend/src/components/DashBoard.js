import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReactToPrint } from "react-to-print";
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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log(panCard, "panCardddddddddddd");

  useEffect(() => {
    console.log("working");
    userDetails();
  }, []);

  const userDetails = async () => {
    await fetch("http://localhost:3005/ShowData")
      .then((res) => res.json())
      .then((data) => {
        console.log("data++++++++++++++++++++", data);
        setDetails(data);
      });
    setIsVisible(true);
  };

  return (
    <>
      <Navbar />
      {isVisible ? (
        <div className="container dashboard" ref={componentRef}>
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
                <div className="row border">
                  <div className="col-md-12 Display 3">
                    <label>{details[0].Name}</label>
                  </div>
                </div>
                <div className="row border Display 3 mt-2 mb-2">
                  <div className="col-md-12">
                    <label>{details[0].fname}</label>
                  </div>
                </div>
                <div className="row border Display 3">
                  <div className="col-md-12">
                    <label>{details[0].location}</label>
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
            <div className="row bg-white">
              <div className="col-md-6">
                <div className="card">
                  <h3>Pan Details</h3>
                  <label>{details[0].panDetails.pc}</label>
                  <label>{details[0].panDetails.name}</label>
                  <label>{details[0].panDetails.fname}</label>
                  <label>{details[0].panDetails.dob}</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <label>
                    <img
                      className="w-75 h-75"
                      src={require(`/home/tanyasharma/project/react_app/src/uploads/${details[0].panCard[0].filename}`)}
                    ></img>
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <h3>Percentage Match</h3>
                  <label>Face Match: {details[0].faceMatch}</label>
                  <label>User Name Match %: {details[0].nameCom}</label>
                  <label>Father Name Match %: {details[0].fatherNameCom}</label>
                </div>
              </div>
            </div>
          </div>
          <center>
            <button
              onClick={handlePrint}
              className="btn btn-primary my-2 my-sm-0 mt-3"
            >
              Print
            </button>
          </center>
        </div>
      ) : null}
    </>
  );
}
