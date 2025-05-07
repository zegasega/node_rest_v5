const BaseController = require('../core/base.controller');
const userService = require('../services/user.service');
const authMiddleware = require('../middlewares/auth.middleware');

class UserController extends BaseController {
    constructor() {
        super(userService);
    }

 
    async getProfile(req, res) {
        try {
            const userId = req.user.id;
            const user = await this.getById(userId);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

   
    async updateProfile(req, res) {
        try {
            const userId = req.user.id;
            const result = await this.update(userId, req.body);
            if (!result) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }


    async deleteProfile(req, res) {
        try {
            const userId = req.user.id;
            const result = await this.delete(userId);
            if (!result) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'Profile deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }


    async getUserPosts(req, res) {
        try {
            const userId = req.params.id;
            const posts = await this.getUserPosts(userId);
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }


    async searchUsers(req, res) {
        try {
            const { query } = req.query;
            const users = await this.searchUsers(query);
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController(); 