// 장바구니에 들어가기 전, 수량과 옵션을 조합한 번들.
module.exports = function (sequelize, DataTypes) {
  const ShoppingGoodsBundle = sequelize.define(
    "ShoppingGoodsBundle",
    {
      // 총 결제 금액 (상품 자체 가격 + 옵션가)
      goodsBundlePaymentTotal: {
        field: "goods_bundle_payment_total",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // 해당 번들의 수량
      goodsBundleQuantity: {
        field: "goods_bundle_quantity",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("NOW()"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("NOW()"),
      },
    },
    {
      timestamps: true,
    }
  );

  ShoppingGoodsBundle.associate = (db) => {
    // 1. 번들은 굿즈와 굿즈 옵션을 1:1로 가지고 있다.
    db.ShoppingGoodsBundle.belongsTo(db.Goods);
    db.ShoppingGoodsBundle.belongsTo(db.GoodsOptions);

    // 2. 여러개의 번들은 하나의 카트에 담긴다 -> 카트쪽에 선언.
  };
  return ShoppingGoodsBundle;
};
