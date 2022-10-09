const { Router } = require("express");
const { Activity } = require("../../db.js");
const router = Router();

router.post("/", async (req, res) => {
  try {
    // duration = integer (days)
    // countries = ['idCountry', 'idCountry', ... ]
    let { name, dificulty, duration, season, countries } = req.body;
    if (!name || !dificulty || !duration || !season)
      throw new Error("Faltan datos obligatorios");
    if (typeof duration !== "number" || !Array.isArray(countries))
      throw new Error("Formato de datos enviados invalido");
    const newActivity = await Activity.create({
      name,
      dificulty,
      duration,
      season,
    });
    await newActivity.addCountries(countries);
    res.status(201).send("Se ha creado con exito");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
