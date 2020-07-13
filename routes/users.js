var express = require("express");
var router = express.Router();
const models = require("../models");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:id", (req, res, next) => {
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
    const user = await db.User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Post,
          as: "Post",
          attributes: ["id"],
        },
        {
          model: db.User,
          as: "Followers",
          attributes: ["id"],
        },
        {
          model: db.User,
          as: "Followings",
          attributes: ["id"],
        },
      ],
    });
    const jsonUser = user.toJSON();
    jsonUser.Post = jsonUser.Post ? jsonUser.Post.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
