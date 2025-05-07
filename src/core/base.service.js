class BaseService {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return await this.model.findAll();
    }

    async getById(id) {
        return await this.model.findByPk(id);
    }

    async create(data) {
        return await this.model.create(data);
    }

    async update(id, data) {
        const instance = await this.model.findByPk(id);
        if (!instance) return null;
        return await instance.update(data);
    }

    async delete(id) {
        const instance = await this.model.findByPk(id);
        if (!instance) return null;
        await instance.destroy();
        return true;
    }
}

module.exports = BaseService; 