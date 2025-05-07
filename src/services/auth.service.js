const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userService = require('./user.service');
const CustomError = require('../utils/customError'); // Eğer CustomError kullanıyorsan

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // .env'den almayı unutma!
const JWT_EXPIRES_IN = '24h'; // Token ömrü

class AuthService {
    async login(email, password) {
        const user = await userService.findByEmail(email);
        if (!user) {
            throw new CustomError(404, 'User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new CustomError(401, 'Invalid password');
        }

        // Token oluştur
        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Password hariç kullanıcı bilgilerini döndür
        const { password: _, ...userWithoutPassword } = user.toJSON();
        return {
            user: userWithoutPassword, // Kullanıcı bilgileri
            token // JWT token
        };
    }

    async register(userData) {
        const existingUser = await userService.findByEmail(userData.email);
        if (existingUser) {
            throw new CustomError(400, 'Email already exists');
        }

        const existingUsername = await userService.findByUsername(userData.username);
        if (existingUsername) {
            throw new CustomError(400, 'Username already exists');
        }

        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(userData.password, 12); // Salt rounds = 12

        // Yeni kullanıcıyı oluştur
        const user = await userService.create({
            ...userData,
            password: hashedPassword
        });

        // Token oluştur
        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Kayıtlı kullanıcı ve token döndür
        return {
            user,
            token
        };
    }
}

module.exports = new AuthService();
