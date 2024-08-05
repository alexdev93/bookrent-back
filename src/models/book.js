module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        title: { type: DataTypes.STRING, allowNull: false },
        author: { type: DataTypes.STRING, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: false },
        available: { type: DataTypes.BOOLEAN, defaultValue: true },
        approved: { type: DataTypes.BOOLEAN, defaultValue: false },
    });

    return Book;
};
