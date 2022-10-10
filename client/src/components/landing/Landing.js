import React from "react";
import style from './landing.module.css'
import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Bienvenido a mi aplicación</h1>
      <button>
        <NavLink to="/home">Ir al Home</NavLink>
      </button>
    </div>
  );
}
