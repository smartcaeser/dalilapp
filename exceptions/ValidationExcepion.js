class ValidationExcepion extends Error {

    constructor(message, errors) {
        super(message)
        this.errors = errors;
        this.name = 'ValidationException';
    }
}

module.exports = ValidationExcepion;