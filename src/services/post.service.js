const BaseService = require('../core/base.service');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const { Op } = require('sequelize');

class PostService extends BaseService {
    constructor() {
        super(Post);
    }

    async getAll() {
        return await this.findAll({
            include: [{
                model: User,
                attributes: ['id', 'username', 'email']
            }]
        });
    }

    async getById(id) {
        return await this.findByPk(id, {
            include: [{
                model: User,
                attributes: ['id', 'username', 'email']
            }]
        });
    }

    async create(data) {
        const post = await this.model.create(data);
        return await this.getById(post.id);
    }

    async update(id, data) {
        const instance = await this.model.findByPk(id);
        if (!instance) return null;
        
        await instance.update(data);
        return await this.getById(id);
    }

    async getUserPosts(userId) {
        return await this.model.findAll({
            where: { userId },
            include: [{
                model: User,
                attributes: ['id', 'username', 'email']
            }],
            order: [['createdAt', 'DESC']]
        });
    }

    async searchPosts(query) {
        return await this.model.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { content: { [Op.like]: `%${query}%` } }
                ]
            },
            include: [{
                model: User,
                attributes: ['id', 'username', 'email']
            }],
            order: [['createdAt', 'DESC']]
        });
    }
}

module.exports = new PostService(); 