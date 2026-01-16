const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/owner.controller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { body } = require('express-validator');

router.use(authMiddleware);
router.use(roleMiddleware('owner'));

router.post('/stores', [
  body('name').isLength({ min: 20, max: 60 }).withMessage('Store name must be between 20 and 60 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  body('address').isLength({ min: 1, max: 400 }).withMessage('Address must not exceed 400 characters')
], ownerController.createStore);
router.get('/stores', ownerController.getMyStores);
router.get('/stores/:id/ratings', ownerController.getStoreRatings);
router.get('/dashboard', ownerController.getDashboard);
router.patch('/password', [
  body('oldPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8, max: 16 }).withMessage('Password must be between 8 and 16 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character')
], ownerController.updatePassword);

module.exports = router;
