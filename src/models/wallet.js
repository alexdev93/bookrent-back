const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Wallet = sequelize.define('Wallet', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        ownerId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        timestamps: true
    });

    return Wallet;
};
