const Sequelize = require("sequelize");

// 구입 주문서 (주문)
module.exports = function (sequelize, DataTypes) {
  const PurchaseOrder = sequelize.define(
    "PurchaseOrder",
    {
      // 주문 번호
      orderNumber: {
        field: "order_number",
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      // 주문 배송 주소
      deliveryAddress: {
        field: "delivery_address",
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      // 배송 메모
      deliveryMemo: {
        field: "delivery_memo",
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      // 수신인 핸드폰 번호
      receiverPhone: {
        field: "receiver_phone",
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      // 결제 수단
      paymentMethodType: {
        field: "payment_method_type",
        type: DataTypes.ENUM(
          "CreditCard",
          "Phone",
          "KakaoPay",
          "Toss",
          "Direct_Cash",
          "Direct_CreditCard"
        ),
        allowNull: false,
        defaultValue: "CreditCard",
      },
      // 배송 타입
      deliveryType: {
        field: "delivery_type",
        type: DataTypes.ENUM("deliver", "visit"),
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

  PurchaseOrder.associate = (db) => {
    // 1. 하나의 주문은 하나의 장바구니에 속한다. (1:1)
    db.PurchaseOrder.belongsTo(db.ShoppingCart);

    // 2. 하나의 주문은 여러개의 리뷰를 가질 수 있다. (최대 2개 - 가게 사장님, 구매자)
    db.PurchaseOrder.hasMany(db.MarketReviews);
  };
  return PurchaseOrder;
};
