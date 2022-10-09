const { Router } = require("express");
const { Op } = require("sequelize");
const { Country } = require("../../db.js");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let countryList;
    if (name) {
      countryList = await Country.findAll({
        where: {
          name: { [Op.like]: `%${name}%` },
        },
      });
      if (countryList.length === 0) throw new Error("Pais no encontrado");
    } else {
      countryList = await Country.findAll();
    }
    res.status(200).send(countryList);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:countryId", async (req, res) => {
  try {
    const { countryId } = req.params;
    if (countryId.length !== 3)
      throw new Error("Formato de codigo de pais incorrecto");
    const countrySearch = await Country.findByPk(countryId);
    if (!countrySearch) throw new Error("Pais no encontrado");
    res.status(200).send(countrySearch);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
