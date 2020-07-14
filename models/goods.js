module.exports = function (sequelize, DataTypes) {
  const Goods = sequelize.define("Goods", {
    goodsName: {
      field: "goods_name",
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    goodsPhoto: {
      field: "goods_photo",
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    price: {
      field: "price",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Goods.associate = (db) => {
    db.Goods.belongsTo(db.Market);
  };
  return Goods;
};
