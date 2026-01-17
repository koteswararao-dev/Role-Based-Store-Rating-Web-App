require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/database');
const { initializeDatabase } = require('./init-db');

const PORT = process.env.PORT || 5000;

// ===========================
// Server Startup
// ===========================
async function startServer() {
  try {
    console.log('🚀 Starting Roxiler Store Rating Server...');
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔌 Port: ${PORT}`);
    
    // Connect to database
    console.log('📊 Connecting to database...');
    await connectDB();
    console.log('✅ Database connected successfully');
    
    // Initialize database with test users if empty
    console.log('🔧 Initializing database...');
    await initializeDatabase();
    
    // Start server
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/`);
      console.log(`📡 API endpoint: http://localhost:${PORT}/api`);
      console.log('🎉 Server ready to accept connections!');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('🛑 SIGTERM received, shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('🛑 SIGINT received, shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

startServer();
