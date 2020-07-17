// 상품 옵션 세팅
module.exports = function (sequelize, DataTypes) {
  const GoodsOptions = sequelize.define("GoodsOptions", {
    optionsName: {
      field: "option_name",
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    optionPrice: {
      field: "option_price",
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  GoodsOptions.associate = (db) => {};
  return GoodsOptions;
};
