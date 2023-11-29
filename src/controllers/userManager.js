import User from '../models/UserModel.js';

class UserManager {
  static id = 0;

  createUser = async (req, res) => {
    const { firstName, lastName, age, email, password, confirmPassword } =
      req.body;

    if (!email || !password) {
      return res.json({
        statusCode: 400,
        message: 'Missing email or password',
      });
    }

    if (!confirmPassword) {
      return res.json({
        statusCode: 400,
        message: 'Please confirm your password.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({ statusCode: 400, message: 'Invalid email address' });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.json({
        statusCode: 400,
        message:
          'Invalid password. Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        statusCode: 400,
        message:
          'Passwords do not match. Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.',
      });
    }

    try {
      const userExists = await User.exists({ email });

      if (userExists) {
        return res.json({
          statusCode: 403,
          message: 'User with the same email already exists.',
        });
      }

      const newUser = await User.create({
        firstName: firstName || '',
        lastName: lastName || '',
        age: age || '',
        email,
        password,
      });

      res.json({
        email: newUser.email,
        message: 'User created successfully',
      });
    } catch (error) {
      console.error(error);
      res.json({
        statusCode: 500,
        message: 'Server Error - user',
      });
    }
  };
}

const users = new UserManager();

export default users;
