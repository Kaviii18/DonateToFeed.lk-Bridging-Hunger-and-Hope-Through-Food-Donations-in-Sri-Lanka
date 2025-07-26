const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// Usage: auth() for any logged-in user
// Usage: auth("Admin") for only admin users, etc.

function auth(requiredRole) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      // Role-based restriction (if requiredRole is provided)
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: 'Access denied: insufficient role' });
      }
      req.user = decoded; // Attach user info to the request
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  }
}

module.exports = auth;
