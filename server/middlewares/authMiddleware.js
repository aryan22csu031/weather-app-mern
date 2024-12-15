// const { verifyToken } = require('../config/jwt');

// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'No token provided' });

//   try {
//     req.user = verifyToken(token);
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// module.exports = authenticate;

const { verifyToken } = require('../config/jwt');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
