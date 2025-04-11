module.exports = {
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost/farmers_market',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key'
};
