const express = require("express");
const { sequelize, Category, Wallet, Transaction } = require("./models/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/bookRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const userRoutes = require("./routes/userRoutes");
const walletRoutes = require("./routes/walletRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/books", bookRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/auths", authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Book Rent</h1>")
})

const { SERVER_HOST, SERVER_PORT } = process.env;
const port = SERVER_PORT || 8080;

app.use(express.json());

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

const categories = [
  { name: "Fiction" },
  { name: "Fantasy" },
  { name: "Mystery" },
  { name: "Biography" },
  { name: "History" },
];
async function insertRandomTransactions() {
  try {
    const getRandomAmount = (min, max) =>
      (Math.random() * (max - min) + min).toFixed(2);

    const getRandomDate = () => {
      const start = new Date();
      start.setFullYear(start.getFullYear() - 1);
      const end = new Date();
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    };

    const transactions = [];
    for (let i = 0; i < 5; i++) {
      transactions.push({
        walletId: 2, 
        amount: getRandomAmount(200, 1000),  
        createdAt: getRandomDate(), 
        updatedAt: new Date(), 
      });
    }
    await Transaction.bulkCreate(transactions);

    console.log("5 random transactions inserted for walletId = 2!");
  } catch (error) {
    console.error("Error inserting transactions:", error);
  }
}



sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      // insertRandomTransactions();
      Category.bulkCreate(categories);
      console.log(`Server running on ${SERVER_HOST}:${SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
