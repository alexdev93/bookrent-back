const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Rental = sequelize.define(
    "Rental",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      renterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rentalDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("rented", "returned"),
        allowNull: false,
        defaultValue: "rented",
      },
    },
    {
      timestamps: true,
    }
  );

  return Rental;
};
