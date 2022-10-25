import axios from "axios";
import style from "./ActivityForm.module.css";
import React, { useEffect, useState } from "react";
import CountrySelector from "./CountrySelector";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../actions";
import SelectedCountries from "./SelectedCountries";

export default function ActivityForm({ countryId }) {
  const dispatch = useDispatch();
  const { countryList, loadingCountries } = useSelector((state) => state);

  const [input, setInput] = useState({
    name: "",
    dificulty: "",
    duration: "",
    season: "Otoño",
  });
  const [countriesSelected, setCountriesSelected] = useState([]);
  const [errors, setErrors] = useState({});
  const [disable, setDisable] = useState(true);
  const [openC, setOpenC] = useState(false);
  const [resultForm, setResultForm] = useState({
    message: "",
    resultClass: "",
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

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
    else if (!/[\w]+[^\s]$/i) errors.name = "Nombre invalido!";
    if (!dificulty)
      errors.dificulty = "La dificulad es requerida es requerido!";
    if (!duration) errors.duration = "La duracion es requerida!";
    else if (duration < 1 || duration > 10)
      errors.duration = "La duración debe ser entre 1 y 10 días!";
    if (!season) errors.name = "La temporada es requerido!";

    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setResultForm({
      message: "",
      resultClass: "",
    });
    if (!countriesSelected.length) {
      setResultForm({
        message: "Debe seleccionar almenos 1 país!",
        resultClass: `${style.result} ${style.result_Fail}`,
      });
      return;
    }
    axios
      .post("http://localhost:3001/activities", {
        ...input,
        dificulty: parseInt(input.dificulty),
        duration: parseInt(input.duration),
        countries: countriesSelected.map((c) => c.id),
      })
      .then((r) => {
        setResultForm({
          message: "Actividad creada exitosamente!",
          resultClass: `${style.result} ${style.result_Success}`,
        });
      })
      .catch((e) => {
        setResultForm({
          message: e.message,
          resultClass: `${style.result} ${style.result_Fail}`,
        });
      });
  };

  const addCountryHandler = (country) => {
    for (let i = 0; i < countriesSelected.length; i++) {
      if (countriesSelected[i].id === country.id) return;
    }
    setCountriesSelected((prev) => [...prev, country]);
  };

  const removeCountryHandler = (id) => {
    let ret = countriesSelected.filter((c) => c.id !== id);
    setCountriesSelected(ret);
  };

  const findCountry = (id) => {
    for (let i = 0; i < countriesSelected.length; i++) {
      if (countriesSelected[i].id === id) return true;
    }
    return false;
  };

  return (
    <>
      {loadingCountries && <h1 className={style.activity_loading}>Cargando formulario ...</h1>}
      {!loadingCountries && (
        <div className={style.activity_form}>
          <h1>Creación de Actividad</h1>
          <form onSubmit={submitHandler}>
            <div className={style.formSection}>
              <label htmlFor="name">Nombre de la actividad:</label>
              <input
                className={errors.name && "danger"}
                type="text"
                name="name"
                key="name"
                value={input.name}
                onChange={handleInputChange}
              />
            </div>
            {errors.name && <p className={style.error_input}>{errors.name}</p>}
            <div className={style.formSection}>
              <label htmlFor="duration">Duración:</label>
              <input
                className={errors.duration && "danger"}
                type="number"
                name="duration"
                key="duration"
                value={input.duration}
                onChange={handleInputChange}
              />
            </div>
            {errors.duration && (
              <p className={style.error_input}>{errors.duration}</p>
            )}
            <div className={style.formSection}>
              <label>Dificultad:</label>
              <div
                className={style.activity_radio}
                onChange={handleInputChange}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={`radio_${num}`}>
                    <input type={"radio"} name="dificulty" value={num} />
                    {num}
                  </label>
                ))}
              </div>
            </div>
            {errors.dificulty && (
              <p className={style.error_input}>{errors.dificulty}</p>
            )}
            <div className={style.formSection}>
              <label htmlFor="season">Temporada:</label>
              <select
                name="season"
                onChange={handleInputChange}
                value={input.season}
              >
                <option value={"Otoño"}>Otoño</option>
                <option value={"Invierno"}>Invierno</option>
                <option value={"Primavera"}>Primavera</option>
                <option value={"Verano"}>Verano</option>
              </select>
            </div>
            <button
              className={style.openCbtn}
              type="button"
              onClick={() => setOpenC(!openC)}
            >
              Añadir paises
            </button>
            <CountrySelector
              countryList={countryList}
              openList={openC}
              addCountry={addCountryHandler}
              findCountry={findCountry}
            />
            <SelectedCountries
              countryList={countriesSelected}
              removeCountryHandler={removeCountryHandler}
            />
            <button
              className={style.submit_btn}
              type="submit"
              disabled={disable}
            >
              Crear Actividad
            </button>
            {resultForm.message && (
              <p className={resultForm.resultClass}>{resultForm.message}</p>
            )}
            <p className={style.last_p}>
              Todos los campos sno requeridos, al igual que almenos un país
              seleccionado
            </p>
          </form>
        </div>
      )}
    </>
  );
}
