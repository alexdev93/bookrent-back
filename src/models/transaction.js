const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      walletId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    //   type: {
    //     type: DataTypes.ENUM("deposit", "withdrawal"),
    //     allowNull: false,
    //   },
    },
    {
      timestamps: true,
    }
  );

  return Transaction;
};
