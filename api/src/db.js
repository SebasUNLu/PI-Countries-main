require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const axios = require("axios");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Country, TouristActivity } = sequelize.models;

Country.belongsToMany(TouristActivity, { through: "country_activity" });
TouristActivity.belongsToMany(Country, { through: "country_activity" });

console.log(sequelize.models);

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

const loadCountries = async () => {
  // Esta funcion es para cargar la BD con los paises al iniciar el servidor
  const fetchedCountries = await axios
    .get(`https://restcountries.com/v3/all`)
    .then((response) => response.data);

  await fetchedCountries.forEach((country) => {
    let {
      cca3,
      translations,
      flags,
      continents,
      capital,
      area,
      subregion,
      population,
    } = country;
    if (!capital) capital = ["undefined"];
    const newCountry = {
      id: cca3,
      name: translations.spa.common,
      flag: flags[0],
      continent: continents[0],
      capital,
      area,
      subregion,
      population,
    };
    Country.create(newCountry);
  });
  console.log('Carga completa');
};

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  loadCountries,
};
