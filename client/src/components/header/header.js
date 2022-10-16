import React from "react";
import { NavLink } from "react-router-dom";
import style from "./header.module.css";

export default function Header() {
  return (
    <div className={style.header}>
      <NavLink exact to="/" activeClassName={style.header_active}>
        Landing
      </NavLink>
      <NavLink exact to="/home" activeClassName={style.header_active}>
        Home
      </NavLink>
      <NavLink exact to="/createActivity" activeClassName={style.header_active}>
        Create Activity
      </NavLink>
    </div>
  );
}
