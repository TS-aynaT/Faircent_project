import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const lg = {
  pc: "",
  pw: "",
};
export default function Login() {
  const [login, setlogin] = useState(lg);
  const { pc, pw } = login;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setlogin({ ...login, [name]: value });
  };

  const sendData = (e) => {
    e.preventDefault();
    axios
      .post("/search", {
        panCard: pc,
        passWord: pw,
      })
      .then((res) => {
        if (res.status == 201) {
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
        <div className="LoginForm">
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
              Password(DOB)
            </label>
            <input
              type="text"
              className="form-control mt-2"
              name="pw"
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
                >
                  Login
                </button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
