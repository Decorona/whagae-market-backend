var express = require("express");
var router = express.Router();

const Sequelize = require("sequelize");
const models = require("../models");
const Op = Sequelize.Op;

/* GET Market listing. */
router.get("/", function (req, res, next) {
  const location = req.query.location;
  const category = req.query.category;

  let whereClause = {};

  if (location) {
    whereClause.marketBusinessLocation = { [Op.like]: "%" + location + "%" };
  }

  if (category) {
    whereClause.marketCategory = category;
  }

  models.Market.findAll({
    where: whereClause,
    include: [
      {
        model: models.MarketReviews,
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

// Market Goods List Search
router.get("/search", async (req, res, next) => {
  let whereClause = {};

  if (req.query.goodsName) {
    whereClause.goodsName = {
      [Op.like]: "%" + req.query.goodsName + "%",
    };
  }

  // console.log(whereClause);
  try {
    const goodsList = await models.Goods.findAll({
      where: whereClause,
      include: [
        {
          model: models.Market,
        },
      ],
    });

    res.json(goodsList);
  } catch (e) {
    console.error(e);
    next(e);
  }
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
      include: [
        {
          model: models.MarketReviews,
        },
      ],
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
          include: [
            {
              model: models.GoodsOptions,
            },
          ],
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
