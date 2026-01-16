// Quick test script to verify database and create test users
require('dotenv').config();
const { sequelize, connectDB } = require('./config/database');
const { User } = require('./models');

async function testDatabase() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    
    console.log('\n✅ Database connected successfully!');
    
    // Check if any users exist
    const userCount = await User.count();
    console.log(`\n📊 Total users in database: ${userCount}`);
    
    if (userCount === 0) {
      console.log('\n⚠️  No users found. Creating test users...\n');
      
      // Create test admin
      const admin = await User.create({
        name: 'Admin User Test Account',
        email: 'admin@test.com',
        password: 'Admin123!',
        address: '123 Admin Street',
        role: 'admin'
      });
      console.log('✅ Created admin:', admin.email);
      
      // Create test owner
      const owner = await User.create({
        name: 'Store Owner Test Account',
        email: 'owner@test.com',
        password: 'Owner123!',
        address: '456 Owner Avenue',
        role: 'owner'
      });
      console.log('✅ Created owner:', owner.email);
      
      // Create test user
      const user = await User.create({
        name: 'Regular User Test Account',
        email: 'user@test.com',
        password: 'User123!',
        address: '789 User Road',
        role: 'user'
      });
      console.log('✅ Created user:', user.email);
      
      console.log('\n✅ Test users created successfully!');
      console.log('\nYou can now login with:');
      console.log('  Admin: admin@test.com / Admin123!');
      console.log('  Owner: owner@test.com / Owner123!');
      console.log('  User:  user@test.com / User123!');
    } else {
      console.log('\n📋 Existing users:');
      const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role'] });
      users.forEach(u => {
        console.log(`  - ${u.email} (${u.role})`);
      });
    }
    
    await sequelize.close();
    console.log('\n✅ Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

testDatabase();
