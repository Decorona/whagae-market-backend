// 쇼핑카트 (장바구니)
module.exports = function (sequelize, DataTypes) {
  const ShoppingCart = sequelize.define(
    "ShoppingCart",
    {
      // 총 결제 금액
      totalAmount: {
        field: "total_amount",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // 해당 장바구니의 결제 완료 여부
      paid: {
        field: "paid",
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
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

  ShoppingCart.associate = (db) => {
    // 1. 장바구니는 하나의 주문서를 가지고 있다.
    db.ShoppingCart.hasOne(db.PurchaseOrder);

    // 2. 하나의 장바구니는 여러개의 상품 번들을 가지고 있다.
    db.ShoppingCart.hasMany(db.ShoppingGoodsBundle);

    // 3. 하나의 장바구니는 마켓에 속한다
    db.ShoppingCart.belongsTo(db.Market);
  };
  return ShoppingCart;
};
