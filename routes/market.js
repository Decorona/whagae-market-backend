var express = require("express");
var router = express.Router();

const Sequelize = require("sequelize");
const models = require("../models");
const Op = Sequelize.Op;

/* GET Market listing. */
router.get("/", function (req, res, next) {
  models.Market.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

// 지역검색
router.get("/region", function (req, res, next) {
  try {
    const location = req.query.location;

    if (!location) {
      throw new Error("지역을 넣어주셔야 합니다.");
    }

    models.Market.findAll({
      where: {
        marketBusinessLocation: {
          [Op.like]: "%" + location + "%",
        },
      },
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const market = await models.Market.findOne({
      where: { id: req.params.id },
    });

    res.json(market);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// Market이 가지고 있는 Goods List
router.get("/:id/goods-list", async (req, res, next) => {
  try {
    const market = await models.Market.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: models.Goods,
        },
      ],
    });

    res.json(market);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;