module.exports = function (sequelize, DataTypes) {
  const Market = sequelize.define(
    "Market",
    {
      marketName: {
        field: "market_name",
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      marketPhoto: {
        field: "market_photo",
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      marketPhone: {
        field: "market_phone",
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      marketCategory: {
        field: "market_category",
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      // 사업자 소재지
      marketBusinessLocation: {
        field: "market_business_location",
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      // 발급된 지역 코드
      marketRegionCode: {
        field: "market_region_code",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      marketStarPoint: {
        field: "market_star_point",
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      isEvent: {
        field: "is_event",
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
  Market.associate = (db) => {
    db.Market.hasMany(db.Goods);

    // 마켓은 여러개의 주문서를 가질 수 있다.
    db.Market.hasMany(db.PurchaseOrder);

    // 마켓은 여러개의 리뷰를 가질 수 있다.
    db.Market.hasMany(db.MarketReviews);
  };
  return Market;
};
