const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('authorization');

    if (!token) return res.status(401).json('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json('Invalid token.');
    }
}

module.exports = auth;