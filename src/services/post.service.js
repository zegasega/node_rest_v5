const BaseService = require('../core/base.service');
const Post = require('../models/post.model');

class PostService extends BaseService {
    constructor() {
        super(Post);
    }

    async getAll() {
        return await this.model.findAll({
            include: ['User']
        });
    }

    async getById(id) {
        return await this.model.findByPk(id, {
            include: ['User']
        });
    }
}

module.exports = new PostService(); 