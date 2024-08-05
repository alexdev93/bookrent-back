const express = require("express");
const {
  getAllBooks,
  createBook,
  approveBook,
  disableBook,
} = require("./../controllers/bookController");
const authenticateToken = require("./../middleware/jwtMiddleware");
const caslMiddleware = require("../middleware/caslMiddleware");
const router = express.Router();

router.get("/", authenticateToken, caslMiddleware, getAllBooks);
router.post("/", authenticateToken, caslMiddleware, createBook);
router.patch(
  "/:bookId/approve",
  authenticateToken,
  caslMiddleware,
  approveBook
);
router.patch(
  "/:bookId/disable",
  authenticateToken,
  caslMiddleware,
  disableBook
);

module.exports = router;
