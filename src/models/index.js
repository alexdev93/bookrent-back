const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true, // This will help to force SSL
      rejectUnauthorized: false, // This line helps in case of self-signed certificates
    },
  },
});


const Category = require("./category")(sequelize);
const User = require("./user")(sequelize);
const Book = require("./book")(sequelize);
const Rental = require("./rental")(sequelize);
const Wallet = require("./wallet")(sequelize);
const Transaction = require("./transaction")(sequelize);

Category.hasMany(Book, { foreignKey: "categoryId" });
Book.belongsTo(Category, { foreignKey: "categoryId" });

User.hasMany(Book, { foreignKey: "ownerId" });
Book.belongsTo(User, { foreignKey: "ownerId" });

Book.hasMany(Rental, { foreignKey: "bookId" });
Rental.belongsTo(Book, { foreignKey: "bookId" });

User.hasOne(Wallet, { foreignKey: "ownerId" });
Wallet.belongsTo(User, { foreignKey: "ownerId" });

User.hasMany(Rental, { foreignKey: "renterId" });
Rental.belongsTo(User, { foreignKey: "renterId" });

Wallet.hasMany(Transaction, { foreignKey: "walletId" });
Transaction.belongsTo(Wallet, { foreignKey: "walletId" });

module.exports = {
  sequelize,
  User,
  Category,
  Rental,
  Book,
  Wallet,
  Transaction,
};
