const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Wallet = sequelize.define(
      "Wallet",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ownerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        balance: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        timestamps: true,
      }
    );

    return Wallet;
};
