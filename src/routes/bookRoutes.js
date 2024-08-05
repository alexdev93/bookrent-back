const express = require('express');
const { getAllBooks, createBook, approveBook, disableBook } = require('./../controllers/bookController');
const authenticateToken = require('./../middleware/jwtMiddleware')
const caslMiddleware = require('../middleware/caslMiddleware');
const router = express.Router();

router.get('/', authenticateToken, caslMiddleware, getAllBooks);
router.post('/', caslMiddleware, authenticateToken, createBook);
router.patch('/:bookId/approve', caslMiddleware, authenticateToken, approveBook);
router.patch('/:bookId/disable', caslMiddleware, authenticateToken, disableBook);

module.exports = router;
