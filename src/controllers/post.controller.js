const BaseController = require('../core/base.controller');
const postService = require('../services/post.service');
const authMiddleware = require('../middlewares/auth.middleware');

class PostController extends BaseController {
    constructor() {
        super(postService);
    }

    // Post oluşturma (auth gerekli)
    async create(req, res) {
        try {
            const userId = req.user.id;
            const postData = { ...req.body, userId };
            const result = await this.service.create(postData);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Post güncelleme (auth gerekli)
    async update(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            // Post'un kullanıcıya ait olup olmadığını kontrol et
            const post = await this.service.getById(id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            if (post.userId !== userId) {
                return res.status(403).json({ message: 'Not authorized to update this post' });
            }

            const result = await this.service.update(id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Post silme (auth gerekli)
    async delete(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            // Post'un kullanıcıya ait olup olmadığını kontrol et
            const post = await this.service.getById(id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            if (post.userId !== userId) {
                return res.status(403).json({ message: 'Not authorized to delete this post' });
            }

            const result = await this.service.delete(id);
            return res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Post arama
    async searchPosts(req, res) {
        try {
            const { query } = req.query;
            const posts = await this.service.searchPosts(query);
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Kullanıcının kendi postlarını getirme
    async getMyPosts(req, res) {
        try {
            const userId = req.user.id;
            const posts = await this.service.getUserPosts(userId);
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PostController(); 