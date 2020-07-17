// 마켓 리뷰 테이블
module.exports = function (sequelize, DataTypes) {
  const MarketReviews = sequelize.define(
    "MarketReviews",
    {
      // 리뷰 내용
      review: {
        field: "review",
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      // 리뷰에 들어갈 이미지
      reviewImage: {
        field: "review_image",
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // 고객이 남긴 리뷰 별점
      reviewStarPoint: {
        field: "review_star_point",
        type: DataTypes.FLOAT,
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

  MarketReviews.associate = (db) => {
    // 하나의 주문서에 하나의 고객 리뷰가 달릴 수 있음
    db.MarketReviews.belongsTo(db.PurchaseOrder);

    // 리뷰는 사장님 리뷰와 고객 리뷰가 나눠짐
    db.MarketReviews.hasOne(db.MarketReviews, { as: "marketOwnerReview" });
  };
  return MarketReviews;
};
