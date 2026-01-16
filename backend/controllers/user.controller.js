const { Store, Rating, User } = require('../models');
const { sequelize } = require('../config/database');
const { Op } = require('sequelize');

exports.getStores = async (req, res) => {
  try {
    const { name, address, sort } = req.query;
    
    // Build where clause for search
    const whereClause = {};
    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` };
    }
    if (address) {
      whereClause.address = { [Op.like]: `%${address}%` };
    }

    // Build order clause for sorting
    let orderClause = [['name', 'ASC']]; // default
    if (sort) {
      const [field, direction] = sort.split(':');
      if (['name', 'address', 'email'].includes(field)) {
        orderClause = [[field, direction.toUpperCase()]];
      }
    }

    // Calculate average rating dynamically using AVG
    const stores = await Store.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name']
        }
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT AVG(rating) 
              FROM Ratings 
              WHERE Ratings.store_id = Store.id
            )`),
            'avgRating'
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*) 
              FROM Ratings 
              WHERE Ratings.store_id = Store.id
            )`),
            'totalRatings'
          ],
          [
            sequelize.literal(`(
              SELECT rating 
              FROM Ratings 
              WHERE Ratings.store_id = Store.id 
              AND Ratings.user_id = ${req.user.id}
            )`),
            'userRating'
          ]
        ]
      },
      order: orderClause
    });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.rateStore = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Check if user already rated this store
    const existingRating = await Rating.findOne({ 
      where: { 
        store_id: storeId, 
        user_id: req.user.id 
      } 
    });
    
    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this store. Use update endpoint to modify.' });
    }

    const newRating = await Rating.create({ 
      store_id: storeId, 
      user_id: req.user.id, 
      rating 
    });

    res.status(201).json({ 
      message: 'Rating submitted successfully', 
      rating: newRating 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { rating } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const existingRating = await Rating.findOne({ 
      where: { 
        store_id: storeId, 
        user_id: req.user.id 
      } 
    });
    
    if (!existingRating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    existingRating.rating = rating;
    await existingRating.save();

    res.json({ 
      message: 'Rating updated successfully', 
      rating: existingRating 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify old password
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
