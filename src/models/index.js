const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

// Import models
const User = require('./user')(sequelize, Sequelize.DataTypes);
const Owner = require('./owner')(sequelize, Sequelize.DataTypes);
const Book = require('./book')(sequelize, Sequelize.DataTypes);

// Define model associations
Owner.hasMany(Book, { foreignKey: 'ownerId' });
Book.belongsTo(Owner, { foreignKey: 'ownerId' });

// // Sync database (create tables if they don't exist)
// sequelize.sync({ alter: true }).then(() => {
//     console.log('Database synchronized');
// }).catch((error) => {
//     console.error('Error syncing database:', error);
// });

module.exports = {
    sequelize,
    User,
    Owner,
    Book,
};
