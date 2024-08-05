const express = require("express");
const {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("./../controllers/categoryController");
const authenticateToken = require("./../middleware/jwtMiddleware");
const caslMiddleware = require("../middleware/caslMiddleware");
const { route } = require("./bookRoutes");
const router = express.Router();

router.get('/', authenticateToken, caslMiddleware, getAllCategory);
router.get('/፡adminId', authenticateToken, caslMiddleware, getCategory);
router.post('/', authenticateToken, caslMiddleware, createCategory);

module.exports = router;