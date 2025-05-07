class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = true;  
    }

    static badRequest(message) {
        return new CustomError(400, message || 'Bad Request');
    }

    static unauthorized(message) {
        return new CustomError(401, message || 'Unauthorized');
    }

    static notFound(message) {
        return new CustomError(404, message || 'Not Found');
    }

    static internal(message) {
        return new CustomError(500, message || 'Internal Server Error');
    }
}

module.exports = CustomError;
