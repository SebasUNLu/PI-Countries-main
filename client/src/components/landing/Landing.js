import React from "react";
import style from "./landing.module.css";
import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <div className={style.landing}>
      <h1 className={style.title_landing}>Bienvenido a mi aplicación</h1>
      <NavLink className={style.button_lading} to="/home">Ir al Home</NavLink>
    </div>
  );
}
