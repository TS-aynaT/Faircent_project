import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import nv from "./nv.gif";
import verified from "./vc.gif";

const Table = () => {
  // const navigate = useNavigate();
  const [Pdata, setPdata] = useState([]);
  const arr = [];
  const [img, setImg] = useState("");
  const [pan, setPan] = useState("");

  // const sendPan = () => {
  //   navigate("/Details");
  // };

  const loadData = async () => {
    const res = await fetch("http://localhost:3005/table");
    const getdata = await res.json();
    setPdata(getdata);

    console.log(getdata, "dddddddd");

    let len = Object.getOwnPropertyNames(getdata);
    for (let i = 0; i < len.length - 1; i++) {
      arr.push(getdata[i].Authorized_By);
      if (arr[i].includes("true")) {
        let pc = getdata[i].PanCard;
        console.log(pc);
        setPan(pc);
        setImg(verified);
      } else {
        setImg(nv);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <table className="table table-bordered text-black mt-5">
        <thead className=" table thead-dark">
          <tr>
            <td>Sno</td>
            <td>PanCard</td>
            <td>Name</td>
            <td>FName</td>
            <td>DOB</td>
            <td>Authorized_By</td>
            <td>Link</td>
          </tr>
        </thead>
        <tbody className="bg-white">
          {Pdata.map((pda) => (
            <tr key={pda.Sno}>
              <td>{pda.Sno}</td>
              <td>{pda.PanCard}</td>
              <td>{pda.Name}</td>
              <td>{pda.FName}</td>
              <td>{pda.DOB}</td>
              <td>
                <img id="img" src={img} alt=""></img>
              </td>
              <td>
                <a
                  href="http://localhost:3000/Dashboard"
                  type="submit"
                  className="btn btn-primary"
                >
                  View Profile
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
