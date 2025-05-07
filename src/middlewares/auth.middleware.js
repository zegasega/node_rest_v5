const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Production'da environment variable kullanın

const authMiddleware = async (req, res, next) => {
    try {
        // Token'ı header'dan al
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const token = authHeader.split(' ')[1];

        // Token'ı doğrula
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Kullanıcıyı bul
        const user = await userService.getById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Kullanıcı bilgisini request'e ekle
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authMiddleware; 