// backend/middleware/roleCheck.js
const roleCheck = (requiredRole) => {
    return (req, res, next) => {
      // Extract the user's role from the authenticated user object
      const userRole = req.user.role; // Assume req.user is populated by the auth middleware
  
      // Check if the user role matches the required role
      if (!userRole || userRole !== requiredRole) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' }); // Send error if user role is insufficient
      }
  
      next(); // Proceed to the next middleware or route handler
    };
  };
  
  module.exports = roleCheck;
  