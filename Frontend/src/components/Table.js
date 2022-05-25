import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const navigate = useNavigate();
  const [Pdata, setPdata] = useState([]);
  const arr = [];
  // const [img, setImg] = useState("");
  // const [pan, setPan] = useState("");

  // const sendPan = () => {
  //   navigate("/Details");
  // };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch("http://localhost:3005/ShowData");
    const getdata = await res.json();
    setPdata(getdata);

    console.log(getdata, "dddddddd");

    let len = Object.getOwnPropertyNames(getdata);
    for (let i = 0; i < len.length - 1; i++) {
      arr.push(getdata[i].panNum);
      // setPan(arr[i]);
      console.log(arr[i], "pan in panset" + i);
    }
  };

  // const onDashboard = (pc) => {
  //   let len = Object.getOwnPropertyNames(Pdata);
  //   for (var i = 0; i < len.length; i++) {
  //     if (pc == pan[i]) {
  //       navigate("/Dashboard/" + `${pc}`);
  //     } else {
  //       console.log("in else");
  //     }
  //   }
  // };

  return (
    <div className="container">
      <table className="table table-bordered text-black mt-5">
        <thead className=" table thead-dark">
          <tr>
            <td>Sno</td>
            <td>PanCard</td>
            <td>Name</td>
            <td>FName</td>
            <td>Link</td>
          </tr>
        </thead>
        <tbody className="bg-white">
          {Pdata.map((pda) => (
            <tr key={pda.Sno}>
              <td>{pda._id}</td>
              <td>{pda.panNum}</td>
              <td>{pda.Name}</td>
              <td>{pda.fname}</td>
              <td>
                <button
                  // onclick={onDashboard(pda.panNum)}
                  className="btn btn-primary"
                >
                  ShowData
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
