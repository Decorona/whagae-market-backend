var express = require("express");
var router = express.Router();
const models = require("../models");

/* GET cart listing. */
router.get("/", function (req, res, next) {
  models.ShoppingCart.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
