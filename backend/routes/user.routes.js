const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { body } = require('express-validator');

router.use(authMiddleware);
router.use(roleMiddleware('user'));

router.get('/stores', userController.getStores);
router.post('/ratings', userController.rateStore);
router.patch('/ratings/:storeId', userController.updateRating);
router.patch('/password', [
  body('oldPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8, max: 16 }).withMessage('Password must be between 8 and 16 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character')
], userController.updatePassword);

module.exports = router;
