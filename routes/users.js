var express = require("express");
var router = express.Router();
const models = require("../models");

/* GET users listing. */
router.get("/", function (req, res, next) {
  models.User.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: { id: req.params.id },
    }).then((result) => {
      res.json(result);
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
