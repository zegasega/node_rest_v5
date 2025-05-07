class BaseController {
    constructor(service) {
        this.service = service;
    }

    async getAll(req, res) {
        try {
            const result = await this.service.getAll();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const result = await this.service.getById(id);
            if (!result) {
                return res.status(404).json({ message: 'Not found' });
            }
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const result = await this.service.create(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const result = await this.service.update(id, req.body);
            if (!result) {
                return res.status(404).json({ message: 'Not found' });
            }
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await this.service.delete(id);
            if (!result) {
                return res.status(404).json({ message: 'Not found' });
            }
            return res.status(200).json({ message: 'Deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = BaseController; 