const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Rental = sequelize.define('Rental', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        renterId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        bookId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        rentalDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('rented', 'returned'),
            allowNull: false,
            defaultValue: 'rented'
        }
    }, {
        timestamps: true
    });

    return Rental;
};
