module.exports = (sequelize, DataTypes) => {
    const Owner = sequelize.define('Owner', {
        name: { type: DataTypes.STRING, allowNull: false },
        approved: { type: DataTypes.BOOLEAN, defaultValue: false },
        status: { type: DataTypes.ENUM('active', 'disabled'), defaultValue: 'active' },
    });

    return Owner;
};
