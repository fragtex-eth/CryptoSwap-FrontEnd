import React from "react";
import "./sidebar.scss";
import logo from "../../../assets/logo.png";
import { RiHomeFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { useState } from "react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <img src={logo} alt="logo crypto trading app" className="sidebar-logo" />
      <nav>
        <div className="sidebar-icon-container">
          <RiHomeFill className="sidebar-icon-container-icon" />
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
