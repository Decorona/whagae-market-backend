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
        type: DataTypes.STRING(30),
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
  };
  return Goods;
};
