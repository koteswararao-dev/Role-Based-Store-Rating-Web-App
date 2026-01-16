// Database initialization - creates test users if database is empty
const { User } = require('./models');

async function initializeDatabase() {
  try {
    const userCount = await User.count();
    
    if (userCount === 0) {
      console.log('📊 Database is empty. Creating test users...');
      
      // Create test admin
      await User.create({
        name: 'Admin User Test Account',
        email: 'admin@test.com',
        password: 'Admin123!',
        address: '123 Admin Street',
        role: 'admin'
      });
      console.log('✅ Created admin: admin@test.com');
      
      // Create test owner
      await User.create({
        name: 'Store Owner Test Account',
        email: 'owner@test.com',
        password: 'Owner123!',
        address: '456 Owner Avenue',
        role: 'owner'
      });
      console.log('✅ Created owner: owner@test.com');
      
      // Create test user
      await User.create({
        name: 'Regular User Test Account',
        email: 'user@test.com',
        password: 'User123!',
        address: '789 User Road',
        role: 'user'
      });
      console.log('✅ Created user: user@test.com');
      
      console.log('✅ Test users initialized successfully!');
    } else {
      console.log(`✅ Database already has ${userCount} users`);
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
  }
}

module.exports = { initializeDatabase };
