var express = require("express");
var router = express.Router();

const Sequelize = require("sequelize");
const models = require("../models");
const Op = Sequelize.Op;

/* GET MarketReviews listing. */
router.get("/", function (req, res, next) {
  models.MarketReviews.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/", function (req, res, next) {
  let values = {
    review: req.body.review,
    reviewImage: req.body.reviewImage,
    reviewStarPoint: req.body.reviewPoint,
    MarketId: req.body.marketId,
    PurchaseOrderId: req.body.purchaseOrderId,
    UserId: req.body.userId,
  };

  console.log(values);
  models.MarketReviews.create(values)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

// findBy MarketId
router.get("/by-market/:id", function (req, res, next) {
  models.MarketReviews.findAll({
    where: { marketOwnerReviewId: { [Op.eq]: null }, MarketId: req.params.id },
    include: [
      {
        model: models.MarketReviews,
        as: "MarketOwnerReview",
      },
      {
        model: models.PurchaseOrder,
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
