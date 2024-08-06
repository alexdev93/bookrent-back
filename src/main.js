const express = require("express");
const { sequelize, Category } = require("./models/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/bookRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const userRoutes = require("./routes/userRoutes");
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const { SERVER_HOST, SERVER_PORT } = process.env;
const port = SERVER_PORT || 9090;

app.use(express.json());

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

const categories = [
  { name: "Science Fiction" },
  { name: "Fantasy" },
  { name: "Mystery" },
  { name: "Biography" },
  { name: "History" },
];

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      Category.bulkCreate(categories);
      console.log(`Server running on ${SERVER_HOST}:${SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
