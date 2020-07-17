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
    const user = await models.User.findOne({
      where: { loginId: req.body.loginId, password: req.body.password },
    });

    res.json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
