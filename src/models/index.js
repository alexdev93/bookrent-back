const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

const User = require('./user')(sequelize);
const Book = require('./book')(sequelize);
const Category = require('./category')(sequelize);
const Rental = require('./rental')(sequelize);
const Wallet = require('./wallet')(sequelize);

User.hasMany(Book, { foreignKey: 'ownerId' });
Book.belongsTo(User, { foreignKey: 'ownerId' });

Book.belongsTo(Category, { foreignKey: 'category' });
Category.hasMany(Book, { foreignKey: 'category' });

Book.hasMany(Rental, { foreignKey: 'bookId' });
Rental.belongsTo(Book, { foreignKey: 'bookId' });

User.hasOne(Wallet, { foreignKey: 'ownerId' });
Wallet.belongsTo(User, { foreignKey: 'ownerId' });

User.hasMany(Rental, { foreignKey: 'renterId' });
Rental.belongsTo(User, { foreignKey: 'renterId' });

module.exports = {
    sequelize,
    User,
    Rental,
    Book,
    Wallet,
    Category,
};
