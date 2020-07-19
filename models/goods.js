module.exports = function (sequelize, DataTypes) {
  const Goods = sequelize.define(
    "Goods",
    {
      goodsName: {
        field: "goods_name",
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      goodsPhoto: {
        field: "goods_photo",
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        field: "price",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        field: "description",
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isSale: {
        field: "is_sale",
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
  Goods.associate = (db) => {
    db.Goods.hasMany(db.GoodsOptions);

    // 굿즈는 마켓에 속한다.
    db.Goods.belongsTo(db.Market);
  };
  return Goods;
};
