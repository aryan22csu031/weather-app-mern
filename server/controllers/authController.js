// const bcrypt = require('bcrypt');
// const { generateToken } = require('../config/jwt');
// const { createUser, findUserByUsername } = require('../models/userModel');

// const signup = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await createUser(username, hashedPassword);
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(400).json({ error: 'User already exists' });
//   }
// };

// const login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const [rows] = await findUserByUsername(username);
//     if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });

//     const user = rows[0];
//     console.log(user);
    
//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

//     const token = generateToken({ id: user.id });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// };

// module.exports = { signup, login };


const bcrypt = require('bcrypt');
const { generateToken } = require('../config/jwt');
const { createUser, findUserByUsername } = require('../models/userModel');

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user already exists
    const [existingUser] = await findUserByUsername(username);
    if (existingUser.length) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, hashedPassword);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const [rows] = await findUserByUsername(username);
    if (!rows.length) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken({ id: user.id });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { signup, login };
