module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define(
    "User",
    {
      userID: {
        field: "user_id",
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      password: {
        field: "password",
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      tableName: "user",
    }
  );
  return user;
};
