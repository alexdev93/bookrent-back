const express = require("express");
const {
  getAllBooks,
  createBook,
  approveBook,
  disableBook,
  getFilteredBooks,
} = require("./../controllers/bookController");
const authenticateToken = require("./../middleware/jwtMiddleware");
const caslMiddleware = require("../middleware/caslMiddleware");
const router = express.Router();
const validate = require("../middleware/validationMiddleware");
const { bookSchema } = require("../validation/userValidation");

router.get("/", authenticateToken, caslMiddleware, getAllBooks);
router.post(
  "/",
  authenticateToken,
  caslMiddleware,
  validate(bookSchema),
  createBook
);
router.get("/", authenticateToken, caslMiddleware, getFilteredBooks);
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
