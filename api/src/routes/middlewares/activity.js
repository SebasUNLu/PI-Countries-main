const { Router } = require("express");
const { TouristActivity } = require("../../db.js");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let activityList = await TouristActivity.findAll();
    res.status(200).send(activityList);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    // duration = integer (days)
    // countries = ['idCountry', 'idCountry', ... ]
    let { name, dificulty, duration, season, review, countries } = req.body;
    if (!name || !dificulty || !duration || !season)
      throw new Error("Faltan datos obligatorios");
    if (
      typeof name !== "string" ||
      typeof dificulty !== "number" ||
      typeof duration !== "number" ||
      typeof season !== "string" ||
      typeof review !== "string" ||
      !Array.isArray(countries)
    )
      throw new Error("Formato de datos enviados invalido");
    const newActivity = await TouristActivity.create({
      name,
      dificulty,
      duration,
      season,
      review,
    });
    await newActivity.addCountries(countries);
    res.status(201).send("Se ha creado con exito");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
