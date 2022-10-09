const { DataTypes } = require("sequelize");
const { CHAR, ARRAY, STRING, INTEGER, FLOAT } = DataTypes;
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "country",
    {
      id: {
        type: CHAR(3),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      flag: {
        type: STRING,
        allowNull: false,
      },
      continent: {
        type: STRING,
        allowNull: false,
      },
      capital: {
        type: ARRAY(STRING),
        allowNull: false,
      },
      subregion: {
        type: STRING,
      },
      area: {
        type: FLOAT,
      },
      population: {
        type: INTEGER,
      },
    },
    {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
    }
  );
};
