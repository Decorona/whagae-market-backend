module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "User",
    {
      loginId: {
        field: "login_id",
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
      },
      password: {
        field: "password",
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      name: {
        field: "name",
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      phone: {
        field: "phone",
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      isSeller: {
        field: "is_seller",
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      coin: {
        field: "coin",
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      address: {
        field: "address",
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      profileImg: {
        field: "profile_img",
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isMember: {
        field: "is_member",
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
  User.associate = (db) => {
    // [엔티티 명세]
    // 유저는 여러개의 사업자(매장)를 가질 수 있다.
    db.User.hasMany(db.Market);

    // 유저는 여러개의 리뷰를 작성할 수 있다.
    db.User.hasMany(db.MarketReviews);

    // 유저는 여러개의 주문을 할 수 있다.
    db.User.hasMany(db.PurchaseOrder);

    // 유저는 마트별로 여러개의 카트를 가질 수 있다.
    db.User.hasMany(db.ShoppingCart);
  };
  return User;
};
