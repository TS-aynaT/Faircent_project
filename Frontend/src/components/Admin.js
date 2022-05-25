import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const adminVal = {
  id: "",
  pass: "",
};
export default function Admin() {
  const [adData, setadData] = useState(adminVal);
  const { id, pass } = adData;
  const navigate = useNavigate();
  const update = (e) => {
    const { name, value } = e.target;
    setadData({ ...adData, [name]: value });
  };

  const loginAdmin = async (e) => {
    // e.preventDefault();
    // var userID = adData.id;
    // var userPass = adData.pass;

    // var backdata = new FormData();
    // backdata.append("uID", userID);
    // backdata.append("uPass", userPass);
    e.preventDefault();
    await axios.post("/Admin", adData).then((res) => {
      // console.log(res.data, "!!!!!!!!!!!!!!11");
      var d = res.data.msg;
      // console.log(d, "###########");
      if (d == "true") {
        console.log("nnnnnnnnnn");
         navigate("/table");
      }
    });
  };
  return (
    <div className="container">
      <div className="form-group Admin">
        <form method="POST">
          <label htmlFor="AdminId">Admin ID</label>
          <input
            name="id"
            type="text"
            value={id}
            className="form-control"
            onChange={update}
          />
          <label htmlFor="Pass">Password</label>
          <input
            name="pass"
            type="password"
            value={pass}
            className="form-control"
            onChange={update}
          />
          <button onClick={loginAdmin} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
