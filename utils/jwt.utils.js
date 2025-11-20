const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = { id: user._id, username: user.username };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

};

module.exports = { generateToken };