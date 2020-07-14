module.exports = function (sequelize, DataTypes) {
  const Market = sequelize.define("Market", {
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
  });
  Market.associate = (db) => {
    db.Market.hasMany(db.Goods);
    db.Market.belongsTo(db.User);
  };
  return Market;
};
