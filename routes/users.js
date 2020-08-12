var express = require("express");
var router = express.Router();
const models = require("../models");

/* GET users listing. */
/**
 * @swagger
 * /users:
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
 *         description: Receive back UserModel
 */
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
    });

    res.json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const {
      userName,
      phone,
      address,
      profileImg,
      isSeller,
      isMember,
    } = req.body;

    if (!userId) {
      throw new Error("'userId' is Required");
    }

    let updateQuery = {};
    if (userName) updateQuery.name = userName;
    if (phone) updateQuery.phone = phone;
    if (address) updateQuery.address = address;
    if (profileImg) updateQuery.profileImg = profileImg;

    if (isSeller === true) updateQuery.isSeller = 1;
    else updateQuery.isSeller = 0;

    if (isMember === true) updateQuery.isMember = 1;
    else updateQuery.isMember = 0;

    const user = await models.User.update(updateQuery, {
      where: { id: userId },
    });

    res.json({ statusCode: 200, changedTo: updateQuery });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 로그인 API
router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.loginId || !req.body.password)
      throw new Error("loginId or password is invalid value");

    const user = await models.User.findOne({
      where: { loginId: req.body.loginId, password: req.body.password },
    });

    res.json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 유저가 가지고 있는 카트를 전부 가지고 옴.
router.get("/:id/cart-list", async (req, res, next) => {
  try {
    const selCartListByUser = await models.User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: models.ShoppingCart,
          include: [
            {
              model: models.ShoppingGoodsBundle,
              include: [
                {
                  model: models.Goods,
                },
                {
                  model: models.GoodsOptions,
                },
              ],
            },
            { model: models.Market },
          ],
        },
      ],
    });

    res.json(selCartListByUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 유저의 장바구니에 상품을 담는다
router.post("/add-to-cart", async function (req, res, next) {
  const userId = req.body.userId;
  const marketId = req.body.marketId;
  const goodsBundlePaymentTotal = req.body.totalPayment; // 해당 번들의 토탈 가격을 받는다.
  const budleQuantity = req.body.budleQuantity;
  const goodsId = req.body.goodsId;
  // const goodsOptionId = req.body.goodsOptionId;

  try {
    if (
      !userId ||
      !marketId ||
      !goodsBundlePaymentTotal ||
      !budleQuantity ||
      !goodsId
    ) {
      throw new Error("파라미터 값은 모두 필수입니다.");
    }

    let values = {
      UserId: userId, // FK라서 대문자로 쓰임
      MarketId: marketId,
      totalAmount: goodsBundlePaymentTotal,
    };

    // 1. 유저가 기존에 같은 마켓의 쇼핑카트가 있으면 기존에 추가해주고 없으면 새로 만든다.
    let cart = await models.ShoppingCart.findOne({
      where: {
        userId: userId,
        marketId: marketId,
      },
    });

    // 기존 카트 update
    if (cart) {
      // 장바구니 총금액을 갱신해준다
      values.totalAmount = cart.totalAmount + values.totalAmount;
      cart.update(values);
    } else {
      // insert
      cart = await models.ShoppingCart.create(values);
    }

    // 2. 카트를 생성했으면 이제 거기에 상품을 담아준다.(번들 생성)
    const result = await models.ShoppingGoodsBundle.create({
      goodsBundlePaymentTotal: goodsBundlePaymentTotal,
      goodsBundleQuantity: budleQuantity,
      // Foreign Key
      GoodId: goodsId,
      ShoppingCartId: cart.id,
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 카트 상세 (해당 유저가 해당 마켓 > 장바구니에 무슨 물건을 담았는지 봐야할 때)
router.get("/market/cart-detail", async (req, res, next) => {
  try {
    if (!req.query.marketId || !req.query.userId) {
      throw new Error("마켓 아이디 또는 유저 아이디는 필수입니다.");
    }

    const selCartDetail = await models.ShoppingCart.findAll({
      where: { MarketId: req.query.marketId, UserId: req.query.userId },
      include: [
        {
          model: models.ShoppingGoodsBundle,
          include: [
            {
              model: models.Goods,
            },
            {
              model: models.GoodsOptions,
            },
          ],
        },
        { model: models.Market },
      ],
    });

    res.json(selCartDetail);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/* GET My Order - 내 전체 주문 목록 리스트 / 마켓에 따라서도 가지고 올 수 있음 */
router.get("/:id/orders", function (req, res, next) {
  let selQuery = {
    UserId: req.params.id,
  };

  let { query } = req;

  if (query.marketId) {
    selQuery.marketId = query.marketId;
  }

  models.PurchaseOrder.findAll({
    where: selQuery,
    include: [
      {
        model: models.ShoppingCart,
        include: [
          {
            model: models.ShoppingGoodsBundle,
          },
          {
            model: models.Market,
          },
        ],
      },
      { model: models.MarketReviews },
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
