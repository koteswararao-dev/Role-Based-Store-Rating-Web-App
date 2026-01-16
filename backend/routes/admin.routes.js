const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { body } = require('express-validator');

router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router.get('/stores', adminController.getAllStores);
router.delete('/stores/:id', adminController.deleteStore);
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserDetails);
router.post('/users', [
  body('name').isLength({ min: 20, max: 60 }).withMessage('Name must be between 20 and 60 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 8, max: 16 }).withMessage('Password must be between 8 and 16 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character'),
  body('address').optional().isLength({ max: 400 }).withMessage('Address must not exceed 400 characters'),
  body('role').isIn(['admin', 'user', 'owner']).withMessage('Invalid role')
], adminController.addUser);
router.post('/stores', [
  body('name').isLength({ min: 20, max: 60 }).withMessage('Store name must be between 20 and 60 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  body('address').isLength({ min: 1, max: 400 }).withMessage('Address must not exceed 400 characters'),
  body('owner_id').isInt().withMessage('Valid owner ID is required')
], adminController.addStore);
router.get('/dashboard', adminController.getDashboardStats);

module.exports = router;
