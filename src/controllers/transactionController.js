const { Wallet, Transaction } = require("../models");

const getWallet = async (req, res) => {
  try {
    const wallets =
      req.user.role === "admin"
        ? await Wallet.findAll({ include: [User] })
        : await Wallet.findAll({
            where: { ownerId: req.user.id },
            include: [User],
          });
    res.json(wallets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getWallet };
