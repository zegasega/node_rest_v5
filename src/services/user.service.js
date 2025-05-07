const BaseService = require('../core/base.service');
const User = require('../models/user.model');

class UserService extends BaseService {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return await this.model.findOne({ where: { email } });
    }

    async findByUsername(username) {
        return await this.model.findOne({ where: { username } });
    }

    async getAll() {
        return await this.model.findAll({
            attributes: { exclude: ['password'] } // Password'ü response'dan çıkar
        });
    }

    async getById(id) {
        return await this.model.findByPk(id, {
            attributes: { exclude: ['password'] } // Password'ü response'dan çıkar
        });
    }

    async create(data) {
        const user = await this.model.create(data);
        const { password, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword;
    }

    async update(id, data) {
        const instance = await this.model.findByPk(id);
        if (!instance) return null;
        
        await instance.update(data);
        const { password, ...userWithoutPassword } = instance.toJSON();
        return userWithoutPassword;
    }
}

module.exports = new UserService(); 