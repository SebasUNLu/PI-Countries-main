import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ActivityForm({ countryId }) {
  const [input, setInput] = useState({
    name: "",
    dificulty: "",
    duration: "",
    season: "Otoño",
    countries: [],
  });
  const [errors, setErrors] = useState({});
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    checkReady();
  }, [input]);

  const checkReady = () => {
    if (Object.keys(errors) > 0) {
      setDisable(true);
      return;
    }
    for (const key in input) {
      if (input[key] === "") {
        setDisable(true);
        return;
      }
    }
    setDisable(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors(validate({ ...input, [name]: value }));
  };

  const validate = ({ name, dificulty, duration, season }) => {
    let errors = {};
    if (!name) errors.name = "El nombre es requerido!";
    else if (!/[\w]+[^\s]$/i) errors.name = "Nombre invalido";
    if (!dificulty)
      errors.dificulty = "La dificulad es requerida es requerido!";
    if (!duration) errors.duration = "La duración es requerido!";
    else if (duration < 1 || duration > 10)
      errors.duration = "La duración debe ser entre 1 y 10 días";
    if (!season) errors.name = "La temporada es requerido!";
    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("input ", input);
    axios
      .post("http://localhost:3001/activities", {
        ...input,
        dificulty: parseInt(input.dificulty),
        duration: parseInt(input.duration),
      })
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1>Creación de Actividad</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Nombre de la actividad:</label>
        <input
          className={errors.name && "danger"}
          type="text"
          name="name"
          key="name"
          value={input.name}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="duration">Duración:</label>
        <input
          className={errors.duration && "danger"}
          type="number"
          name="duration"
          key="duration"
          value={input.duration}
          onChange={handleInputChange}
        />
        <br />
        <div>
          <label>Dificultad:</label>
          <div onChange={handleInputChange}>
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={`radio_${num}`}>
                <input type={"radio"} name="dificulty" value={num} />
                {num}
              </label>
            ))}
          </div>
        </div>
        <label htmlFor="season">Temporada:</label>
        <select name="season" onChange={handleInputChange} value={input.season}>
          <option value={"Otoño"}>Otoño</option>
          <option value={"Invierno"}>Invierno</option>
          <option value={"Primavera"}>Primavera</option>
          <option value={"Verano"}>Verano</option>
        </select>
        <br />
        <button type="submit" disabled={disable}>
          Crear Actividad
        </button>
      </form>
    </div>
  );
}
