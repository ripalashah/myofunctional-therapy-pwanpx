// Check all users in the database to verify roles
const listUsers = async () => {
    try {
      const users = await User.find();
      console.log('Existing users:', users.map(user => ({ name: user.name, email: user.email, role: user.role })));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  // Call the function to list users
  listUsers();
  