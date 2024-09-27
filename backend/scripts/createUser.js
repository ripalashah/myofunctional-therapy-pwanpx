// Example code to create a therapist user
const createTherapistUser = async () => {
    try {
      const user = new User({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword', // Ensure this is hashed
        role: 'therapist',
      });
  
      await user.save();
      console.log('Therapist user created successfully.');
    } catch (error) {
      console.error('Error creating therapist user:', error);
    }
  };
  
  // Call the function to create a therapist
  createTherapistUser();
  