const { Store, User, Rating } = require('../models');
const { sequelize } = require('../config/database');
const { Op } = require('sequelize');

exports.getAllStores = async (req, res) => {
  try {
    const { name, email, address, sort } = req.query;
    
    // Build where clause for filters
    const whereClause = {};
    if (name) whereClause.name = { [Op.like]: `%${name}%` };
    if (email) whereClause.email = { [Op.like]: `%${email}%` };
    if (address) whereClause.address = { [Op.like]: `%${address}%` };

    // Build order clause for sorting
    let orderClause = [['name', 'ASC']];
    if (sort) {
      const [field, direction] = sort.split(':');
      if (['name', 'email', 'address'].includes(field)) {
        orderClause = [[field, direction.toUpperCase()]];
      }
    }

    // Calculate average rating using SQL AVG function
    const stores = await Store.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email']
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

exports.deleteStore = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    await store.destroy();
    res.json({ message: 'Store deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { name, email, address, role, sort } = req.query;
    
    // Build where clause for filters
    const whereClause = {};
    if (name) whereClause.name = { [Op.like]: `%${name}%` };
    if (email) whereClause.email = { [Op.like]: `%${email}%` };
    if (address) whereClause.address = { [Op.like]: `%${address}%` };
    if (role) whereClause.role = role;

    // Build order clause for sorting
    let orderClause = [['name', 'ASC']];
    if (sort) {
      const [field, direction] = sort.split(':');
      if (['name', 'email', 'address', 'role'].includes(field)) {
        orderClause = [[field, direction.toUpperCase()]];
      }
    }

    const users = await User.findAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      order: orderClause
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({ name, email, password, address, role });
    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;
    
    const owner = await User.findByPk(owner_id);
    if (!owner || owner.role !== 'owner') {
      return res.status(400).json({ message: 'Invalid owner' });
    }

    const store = await Store.create({ name, email, address, owner_id });
    res.status(201).json({ message: 'Store created successfully', store });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({
      totalUsers,
      totalStores,
      totalRatings
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = user.toJSON();

    // If user is a store owner, include their store rating
    if (user.role === 'owner') {
      const store = await Store.findOne({ 
        where: { owner_id: user.id },
        attributes: {
          include: [
            [
              sequelize.literal(`(
                SELECT AVG(rating) 
                FROM Ratings 
                WHERE Ratings.store_id = Store.id
              )`),
              'avgRating'
            ]
          ]
        }
      });
      
      if (store) {
        userData.store = store;
      }
    }

    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
