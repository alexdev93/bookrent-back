const express = require("express");
const {
  getAllOwners,
  approveOwner,
  disableOwner,
} = require("../controllers/ownerController");
const authenticateToken = require("./../middleware/jwtMiddleware");
const caslMiddleware = require("../middleware/caslMiddleware");
const router = express.Router();

router.get("/", authenticateToken, caslMiddleware, getAllOwners);
router.patch(
  "/:ownerId/approve",
  authenticateToken,
  caslMiddleware,
  approveOwner
);
router.patch(
  "/:ownerId/disable",
  authenticateToken,
  caslMiddleware,
  disableOwner
);

module.exports = router;
