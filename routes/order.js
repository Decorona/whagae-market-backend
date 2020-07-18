var express = require("express");
var router = express.Router();
const models = require("../models");

/* 주문하기 */
router.post("/", async function (req, res, next) {
  let values = {
    deliveryAddress: req.body.deliveryAddress,
    deliveryMemo: req.body.deliveryMemo,
    receiverPhone: req.body.receiverPhone,
    paymentMethodType: req.body.paymentMethodType,
    MarketId: req.body.marketId,
    ShoppingCartId: req.body.shoppingCartId,
    UserId: req.body.userId,
  };

  try {
    // validation check
    Object.keys(values).map((key) => {
      if (!values[key]) {
        throw new Error(`request body:${key} is Empty`);
      }
    });

    // 쇼핑카트에서 결제 금액이 얼마인지 가져온다.
    const shopping_cart = await models.ShoppingCart.findOne({
      where: values.ShoppingCartId,
    });

    if (shopping_cart) {
      // 쇼핑카트가 존재하면, 그 안에 들어있는 토탈 금액을 가져와서 유저 코인에서 제외한다.(결제)
      const user = await models.User.findOne({
        where: { id: values.UserId },
      });

      if (!user) {
        throw new Error("User is not Exist");
      }

      // 코인이 충분한지 체크
      const remainder = user.coin - shopping_cart.totalAmount;
      if (remainder < 0) {
        throw new Error("coin is deficient, Please recharge the coin");
      }

      // 코인 차감
      await user.update({
        coin: remainder,
      });

      // 최종 결제 주문서 발행
      models.PurchaseOrder.create(values)
        .then((result) => {
          result.dataValues.remainderCoin = user.coin;
          res.json(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      throw new Error("shopping cart is not exist");
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
