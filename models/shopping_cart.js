// 쇼핑카트 (장바구니)
module.exports = function (sequelize, DataTypes) {
  const ShoppingCart = sequelize.define("ShoppingCart", {
    // 총 결제 금액
    totalAmount: {
      field: "total_amount",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  ShoppingCart.associate = (db) => {
    // 1. 장바구니는 하나의 주문서를 가지고 있다.
    db.ShoppingCart.hasOne(db.PurchaseOrder);

    // 2. 하나의 장바구니는 여러개의 상품 번들을 가지고 있다.
    db.ShoppingCart.hasMany(db.ShoppingGoodsBundle);
  };
  return ShoppingCart;
};
