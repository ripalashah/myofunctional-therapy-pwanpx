// Updated roleCheck middleware to accept multiple roles
const roleCheck = (requiredRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Get the user's role from the request

    // Check if the requiredRoles parameter is an array and if the user's role is included
    if (!userRole || !requiredRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    next(); // Allow access if the role matches
  };
};

module.exports = roleCheck;
