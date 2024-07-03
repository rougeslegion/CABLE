import React from "react";
import logo from "./assets/logo.png";
import "./PrivateRoute.css";

export const PrivateRoute = () => {
  return (
    <nav className="navbar navbar-light py-2 px-5">
      <div class="app-title">
        <span class="navbar-brand">
          <img
            src={logo}
            width="45"
            height="45"
            class="logo d-inline-block align-top"
            alt=""
          />
          <h5>C.A.B.L.E</h5>
        </span>
      </div>
      <div class="menu">
        <div class="nav-item">
          <a class="navbar-brand" href="/">
            <h5>HOME</h5>
          </a>
        </div>
       
        <div class="nav-item">
          <a class="navbar-brand" href="BacDive_Search">
            <h5>BacDive Module</h5>
          </a>
        </div>
        <div class="nav-item">
          <a class="navbar-brand" href="/strains">
            <h5>STRAINS</h5>
          </a>
        </div>
        <div class="nav-item">
          <a class="navbar-brand" href="/about">
            <h5>ABOUT</h5>
          </a>
        </div>
      </div>
    </nav>
  );
};
