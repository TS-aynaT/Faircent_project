import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ContactsIcon from "@mui/icons-material/Contacts";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
const pdata = {
  uname: "",
  fname: "",
  pc: "",
  phoneNum: "",
  emailID: "",
};
const locc = {
  add: "",
  pincode: "",
};

const Myform = () => {
  const [state, setState] = useState(pdata);
  const [loc, setLoc] = useState(locc);

  const { uname, fname, pc, emailID, phoneNum } = state;
  const { add, pincode } = loc;

  const navigate = useNavigate();
  const getlocation = async (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(async (position) => {
      var x = position.coords.latitude;
      var y = position.coords.longitude;

      console.log("latitude:", x);
      console.log("Longitude: ", y);
      const add = await axios.request(
        `http://nominatim.openstreetmap.org/reverse?format=json&lat=${x}&lon=${y}&zoom=18&addressdetails=1`
      );

      const { suburb, city_district, city, state, country, postcode } =
        add.data.address;
      const a = `${suburb}, ${city_district}, ${city}, ${state}, ${country}`;
      const b = `${postcode}`;
      setLoc({ add: a, pincode: b });
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    setLoc({ ...loc, [name]: value });
  };

  const sendData = async (event) => {
    event.preventDefault();

    const userPan = document.querySelector("#pan").files[0];
    const name = state.uname;
    const fName = state.fname;
    const address = loc.add + "-" + loc.pincode;
    const emailID = state.emailID;
    const phoneNum = state.phoneNum;

    const formData = new FormData();
    console.log(state, "In statee");
    formData.append("userName", name);
    formData.append("fatherName", fName);
    formData.append("userPanCard", userPan);
    formData.append("emailId", emailID);
    formData.append("phoneNum", phoneNum);
    formData.append("address", address);

    await axios
      .post("/Register", formData)
      .then((res) => {
        let s = res.status;
        let id = res.data.userId;
        if (s == 200) {
          navigate("/camera/" + `${id}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <div className="MyForm mt-5">
        <form
          method="POST"
          // action="../../Register"
          encType="multipart/form-data"
        >
          <div className="form-group text-left">
            <div className="Title">
              <center>
                <h3> Sign In</h3>
              </center>
            </div>
            <label className="mb-2" htmlFor="name">
              <PersonIcon /> Name:
            </label>
            <input
              name="uname"
              type="text"
              className="form-control"
              value={uname}
              onChange={handleInputChange}
              id="name"
              // onSubmit={handleInputs}
            />
            <label className="mb-2 mt-2" htmlFor="fname">
              <PersonIcon /> Father's name:
            </label>
            <input
              name="fname"
              type="text"
              className="form-control"
              value={fname}
              onChange={handleInputChange}
              id="fname"
            />
            <label className="mb-2 mt-2" htmlFor="emailID">
              <EmailIcon />
              Email ID:
            </label>
            <input
              name="emailID"
              type="email"
              className="form-control"
              value={emailID}
              onChange={handleInputChange}
              id="emailID"
            />
            <label className="mb-2 mt-2" htmlFor="phoneNum">
              <ContactsIcon /> Contact Number:
            </label>

            <input
              name="phoneNum"
              type="number"
              className="form-control"
              value={phoneNum}
              onChange={handleInputChange}
              id="phoneNum"
            />
            <label className="mb-2 mt-2" htmlFor="pan">
              <UploadIcon />
              PanCard
            </label>
            <input
              type="file"
              className="form-control"
              id="pan"
              name="pc"
              onChange={handleInputChange}
            />

            <label className="mb-3 mt-3" htmlFor="location">
              Fetch Location <MyLocationIcon />
            </label>
            <div id="loc">
              <div className="row">
                <div className="col-md-9">
                  <input
                    id="locate"
                    className="form-control"
                    defaultValue={loc.add}
                  ></input>
                </div>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    defaultValue={loc.pincode}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <center>
            <div id="button">
              <button className="btn btn-primary " onClick={getlocation}>
                Get Location
              </button>
              <button
                className="btn btn-primary"
                onClick={sendData}
                type="submit"
              >
                Submit
              </button>
            </div>
          </center>
        </form>
      </div>
    </div>
  );
};

export default Myform;
