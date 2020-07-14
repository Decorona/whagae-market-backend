module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
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
    sellerYn: {
      field: "seller_yn",
      type: DataTypes.STRING(1),
      allowNull: false,
    },
  });
  return User;
};
