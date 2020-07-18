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
    const selCartListByUser = await models.User.findAll({
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

module.exports = router;
