import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function CountryCard({ name, continent, flag }) {
  return (
    <div>
      <img alt={`${name} flag`} src={flag} />
      <h3>{name}</h3>
      <p>{continent}</p>
    </div>
  );
}
