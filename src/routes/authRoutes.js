const express = require("express");
const router = express.Router();
const authenticateToken = require("./../middleware/jwtMiddleware");

router.post("/verify", authenticateToken, (req, res) => {
      res.json(true);
});

module.exports = router;
