const { Store, Rating, User } = require('../models');
const { sequelize } = require('../config/database');

exports.createStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    
    const store = await Store.create({
      name,
      email,
      address,
      owner_id: req.user.id
    });
    
    res.status(201).json({ message: 'Store created successfully', store });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyStores = async (req, res) => {
  try {
    const stores = await Store.findAll({ 
      where: { owner_id: req.user.id },
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
          ]
        ]
      }
    });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getStoreRatings = async (req, res) => {
  try {
    const store = await Store.findOne({ 
      where: { 
        id: req.params.id, 
        owner_id: req.user.id 
      } 
    });
    
    if (!store) {
      return res.status(404).json({ message: 'Store not found or access denied' });
    }

    const ratings = await Rating.findAll({ 
      where: { store_id: req.params.id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    // Calculate average rating
    const avgRating = await Rating.findOne({
      where: { store_id: req.params.id },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']
      ],
      raw: true
    });

    res.json({ 
      store,
      ratings,
      avgRating: avgRating?.avgRating || 0,
      totalRatings: ratings.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const stores = await Store.findAll({
      where: { owner_id: req.user.id },
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
          ]
        ]
      }
    });

    res.json({ stores });
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
