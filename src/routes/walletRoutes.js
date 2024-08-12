const express = require("express");
const router = express.Router();
const walletController = require("./../controllers/walletController");
const authenticateToken = require("./../middleware/jwtMiddleware");

router.get("/", authenticateToken, walletController.getWallet);

module.exports = router;
