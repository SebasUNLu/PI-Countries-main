import React from "react";
import { NavLink } from "react-router-dom";
import style from "./header.module.css";

export default function Header() {
  return (
    <div className={style.header}>
      <NavLink to="/">Landing</NavLink>
      <NavLink to="/home">Home</NavLink>
    </div>
  );
}
