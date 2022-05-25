import React, { useEffect, useState } from "react";
import axios from "axios";
// import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const loginDetails = {
  pc: "",
  phoneNum: "",
};
export default function Login() {
  useEffect(() => {
    loadData();
  }, []);
  var panArr = [];
  var numArr = [];

  const [login, setlogin] = useState(loginDetails);
  const [details, setDetails] = useState();
  const [dlen, setDlen] = useState();

  const { pc, phoneNum } = login;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setlogin({ ...login, [name]: value });
  };

  const loadData = async () => {
    const response = await fetch("http://localhost:3005/ShowData");
    const getdata = await response.json();
    setDetails(getdata);
    console.log(getdata, "uuuuuuuuuuu");
    let len = Object.getOwnPropertyNames(getdata);
    setDlen(len.length);
    for (var i = 0; i < len.length; i++) {
      // console.log(getdata[i].panNum, "iiii######");
      panArr.push(getdata[i].panNum);
      console.log(panArr[i] + " " + i);
      numArr.push(getdata[i].phoneNum);
      console.log(numArr[i], " ", i);
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    await axios
      .post("/search", { pc, phoneNum })
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          navigate("/Dashboard/" + `${pc}`);
        }
        console.log("data is being Send");
      })
      .catch(() => {
        console.log("in catch of login");
        var text = "You are not a registered User";
        if (window.confirm(text) == true) {
          navigate("/Register");
        } else {
          navigate("/");
        }
      });
  };

  return (
    <div>
      <div className="container">
        <div className="LoginForm mt-5">
          <form method="POST">
            <center>
              <h2>Happy To See You Again!..</h2>
            </center>
            <label htmlFor="pc" className="mt-2">
              PanCard
            </label>
            <input
              type="text"
              className="form-control mt-2"
              name="pc"
              onChange={handleInputChange}
            />
            <label htmlFor="pw" className="mt-2">
              Password(Phone Number)
            </label>
            <input
              type="number"
              className="form-control mt-2"
              name="phoneNum"
              onChange={handleInputChange}
            />

            <div className="mt-3">
              <center>
                <a
                  href="http://localhost:3000/Register"
                  style={{ marginRight: "25px" }}
                  className="btn btn-primary "
                >
                  Register
                </a>
                <button
                  onClick={sendData}
                  type="submit"
                  className="btn btn-primary "
                  style={{ marginRight: "25px" }}
                >
                  Login
                </button>
                <a
                  href="http://localhost:3000/Admin"
                  className="btn btn-primary"
                >
                  Admin Login
                </a>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
