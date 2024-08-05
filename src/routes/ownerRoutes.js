const express = require('express');
const { getAllOwners, approveOwner, disableOwner } = require('../controllers/ownerController');
const authenticateToken = require('./../middleware/jwtMiddleware')
const caslMiddleware = require('../middleware/caslMiddleware');
const router = express.Router();

router.get('/', caslMiddleware, authenticateToken, getAllOwners);
router.patch('/:ownerId/approve', caslMiddleware, authenticateToken, approveOwner);
router.patch('/:ownerId/disable', caslMiddleware, authenticateToken, disableOwner);

module.exports = router;
