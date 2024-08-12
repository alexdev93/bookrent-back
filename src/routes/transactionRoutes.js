const express = require("express");
const router = express.Router();
const { Wallet, Transaction } = require("../models"); 
const authenticateToken = require("../middleware/jwtMiddleware");

router.get("/", authenticateToken, async (req, res) => {
  const  ownerId = req.user.id;

  try {
    const wallet = await Wallet.findOne({where: {ownerId: ownerId}});

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }


    // change the wallet id
    // urgent 
    //uygkybh
    const transactions = await Transaction.findAll({
      where: { walletId: 3 },
      order: [["createdAt", "DESC"]], 
    });

    // Respond with the transactions
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
