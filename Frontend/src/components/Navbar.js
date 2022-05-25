import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import nv from "./faircent-logo.png";
export default function Navbar() {
  const navigate = useNavigate;
  const navme = () => {
    navigate("/");
  };

  return (
    <NavLink
      className="navbar navbar-light bg-light justify-content-between"
      to="#"
    >
      <img
        src={nv}
        alt="logo"
        width="353"
        height="75"
        className="d-inline-block align-top"
      />

      <form className="form-inline">
        <button
          onClick={navme}
          className="btn btn-outline-primary my-2 my-sm-0"
          type="submit"
        >
          Sign out
        </button>
      </form>
    </NavLink>
  );
}
