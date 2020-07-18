var express = require("express");
var router = express.Router();
const models = require("../models");

/* GET goods-bundle listing. */
router.get("/", function (req, res, next) {
  models.ShoppingGoodsBundle.findAll({
    include: [
      {
        model: models.Goods,
      },
      {
        model: models.GoodsOptions,
      },
    ],
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
