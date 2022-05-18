import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";

const OpenCamera = () => {
  const id = useParams();
  var img;
  const setRef = (webcam) => {
    webcam = webcam;
  };

  const navigate = useNavigate();

  const detectHuman = async () => {
    console.log("detecting");
    const model = await blazeface.load();
    const returnTensors = false;
    const predictions = await model.estimateFaces(
      document.querySelector("#canvas"),
      returnTensors
    );

    if (predictions.length == 0) {
      window.alert("No human detected");
      tryAgain();
    } else if (predictions.length == 1) {
      setTimeout(getAlert, 1000);
    } else {
      window.alert("Sorry, try with one face");
      tryAgain();
    }
  };

  const tryAgain = () => {
    let text = "Do you want to try again?";
    if (window.confirm(text) == true) {
      window.alert("Picture will be clicked again");
      setTimeout(capture, 2000);
    } else {
      window.alert("Render to Main Page");
      navigate("/");
    }
  };

  const capture = async () => {
    const web = document.querySelector("#web");

    let canvas = document.querySelector("#canvas");
    canvas.getContext("2d").drawImage(web, 0, 0, canvas.width, canvas.height);
    var url = await canvas.toDataURL("image/jpg");
    // console.log(url);
    img = url;

    detectHuman();
  };

  const sendImg = async () => {
    const pic = new FormData();
    console.log(img);
    console.log(id, "iiiiiiiiiid");
    pic.append("uImg", img);

    pic.append("uID", id.id);
    console.log(pic, "picccccccccc dataaaaaaa");
    await axios
      .post("/addpic", pic)
      .then((res) => {
        var id = res.data.userId;
        var pc = res.data.pc;
        var dob = res.data.dob;
        console.log(res.data, "data from frontend");
        if (res.status == 200) {
          navigate("/Dashboard/" + `${pc}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAlert = () => {
    let text = "Continue with the Picture?";
    if (window.confirm(text) == true) {
      sendImg();
    } else {
      window.alert("Picture will be clicked in 2 sec.");
      setTimeout(capture, 2000);
      console.log("captured");
    }
  };

  const videoConstraints = {
    width: 1100,
    height: 1100,
    facingMode: "user",
  };

  return (
    <div className="container">
      <center>
        <div className="CameraIn">
          <Webcam
            className="mb-2"
            id="web"
            audio={true}
            height={350}
            ref={setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <div className="">
            <button className="btn btn-primary" onClick={capture}>
              Capture photo
            </button>
          </div>
          <div className="mt-5">
            <canvas id="canvas" height={200} width={350}></canvas>
          </div>
        </div>
      </center>
    </div>
  );
};

export default OpenCamera;
