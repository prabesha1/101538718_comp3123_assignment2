const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  console.log('🔐 AUTH MIDDLEWARE CALLED for:', req.method, req.path);
  const authHeader = req.headers['authorization']; // "Bearer token"
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    console.log('❌ No token found');
    return res.status(401).json({ message: 'No token, auth denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId: ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

