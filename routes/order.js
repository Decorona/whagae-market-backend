var express = require("express");
var router = express.Router();
const models = require("../models");

/* 주문하기 */
router.post("/", function (req, res, next) {
  let values = {
    deliveryAddress: req.body.deliveryAddress,
    deliveryMemo: req.body.deliveryMemo,
    receiverPhone: req.body.receiverPhone,
    paymentMethodType: req.body.paymentMethodType,
    MarketId: req.body.marketId,
    ShoppingCartId: req.body.shoppingCartId,
    UserId: req.body.userId,
  };

  models.PurchaseOrder.create(values)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
