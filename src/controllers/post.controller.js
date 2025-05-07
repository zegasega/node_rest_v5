const BaseController = require('../core/base.controller');
const postService = require('../services/post.service');

class PostController extends BaseController {
    constructor() {
        super(postService);
    }
}

module.exports = new PostController(); 