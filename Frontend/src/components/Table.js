import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

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

  const onDashboard = () => {
    // let len = Object.getOwnPropertyNames(arr);
    // console.log(len, "kekeke");
    // console.log(pc, "hhjkkk");
    console.log("in funccccccc");
  };

  return (
    <div className="container border">
      <center>
        <h3 className=" mb-2 mt-2 border">Details</h3>
      </center>
      <table className="table mt-2 tabledata">
        <thead className=" table">
          <tr>
            <td>Sno</td>
            <td>PanCard</td>
            <td>Name</td>
            <td>FName</td>
            <td>Link</td>
          </tr>
        </thead>
        <tbody className="border">
          {Pdata.map((pda) => (
            <tr key={pda.Sno}>
              <td>{pda._id}</td>
              <td>{pda.panNum}</td>
              <td>{pda.Name}</td>
              <td>{pda.fname}</td>
              {/* <td>
               
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={3} className="border" />
    </div>
  );
};
export default Table;
