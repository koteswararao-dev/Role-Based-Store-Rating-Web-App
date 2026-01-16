require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/database');
const { initializeDatabase } = require('./init-db');

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  // Initialize database with test users if empty
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
