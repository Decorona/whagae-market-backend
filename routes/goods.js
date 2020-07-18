var express = require("express");
var router = express.Router();
const models = require("../models");

/* GET goods listing. */
router.get("/", function (req, res, next) {
  models.Goods.findAll({
    include: [
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

// 개별 상품 상세
router.get("/:id", async (req, res, next) => {
  try {
    const Goods = await models.Goods.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: models.GoodsOptions,
        },
      ],
    });

    res.json(Goods);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
