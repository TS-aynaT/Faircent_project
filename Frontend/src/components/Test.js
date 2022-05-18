import React from "react";
export default function Test() {
  const fdata = () => {
    fetch("http://localhost:3002/test")
      .then((res) => {
        console.log(res, "res");
        return res.text();
      })
      .then((data) => {
        console.log(data, "dataaaaaaaaa");
      });
  };

  return (
    <div>
      <h1>In test</h1>

      <button className="btn btn-primary" onClick={fdata}></button>
    </div>
  );
}
