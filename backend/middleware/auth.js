const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  
  const token = req.header('x-auth-token');
  console.log("Received token:", token);
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); 
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log("Token verification failed:", err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};