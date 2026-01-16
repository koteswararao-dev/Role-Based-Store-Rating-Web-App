const User = require('./User');
const Store = require('./Store');
const Rating = require('./Rating');

// Define associations
Store.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.hasMany(Store, { foreignKey: 'owner_id', as: 'stores' });

Rating.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Rating.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });

User.hasMany(Rating, { foreignKey: 'user_id', as: 'ratings' });
Store.hasMany(Rating, { foreignKey: 'store_id', as: 'ratings' });

module.exports = { User, Store, Rating };
