const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userService = require('./user.service');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

class AuthService {
    async login(email, password) {
        const user = await userService.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        const { password: _, ...userWithoutPassword } = user.toJSON();
        return {
            user: userWithoutPassword,
            token
        };
    }

    async register(userData) {
        const existingUser = await userService.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        const existingUsername = await userService.findByUsername(userData.username);
        if (existingUsername) {
            throw new Error('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const user = await userService.create({
            ...userData,
            password: hashedPassword
        });

        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return {
            user,
            token
        };
    }
}

module.exports = new AuthService(); 