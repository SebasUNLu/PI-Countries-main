const { DataTypes } = require("sequelize");
const { STRING, INTEGER, ENUM } = DataTypes;
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "touristActivity",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      dificulty: {
        type: INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      duration: {
        // Duración en días
        type: INTEGER,
        allowNull: false,
      },
      season: {
        type: ENUM("Verano", "Otoño", "Invierno", "Primavera"),
        allowNull: false,
      },
      review: {
        type: STRING,
        allowNull: false
      }
    },
    {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
    }
  );
};
