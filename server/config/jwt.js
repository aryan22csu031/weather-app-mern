const jwt = require('jsonwebtoken');

const SECRET_KEY = 'internship123';

const generateToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = { generateToken, verifyToken };
