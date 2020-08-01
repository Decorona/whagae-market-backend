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

  PurchaseOrder.associate = (db) => {};
  return PurchaseOrder;
};
