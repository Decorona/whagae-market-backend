var express = require("express");
var router = express.Router();
const models = require("../models");

/* GET users listing. */
/**
 * @swagger
 * /markets:
 *   get:
 *     consumes:
 *       — application/json
 *     parameters:
 *       — name: get
 *       in: get
 *       schema:
 *         type: object
 *         properties:
 *     responses:
 *       200:
 *         description: Receive back MarketModel
 */
router.get("/", function (req, res, next) {
  models.Market.findAll({
    include: [
      {
        model: models.MarketReviews,
        where: { PurchaseOrderId: Market.id },
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

router.get("/:id", async (req, res, next) => {
  try {
    const user = await models.Market.findOne({
      where: { id: req.params.id },
    });

    res.json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
