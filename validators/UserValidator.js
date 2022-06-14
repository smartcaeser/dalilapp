const ValidationExcepion = require('../exceptions/ValidationExcepion');

const CommonValidator = require('./CommonValidator');

class UserValidator extends CommonValidator {

    validate(body) {
        var errors = [];

        errors = errors.concat(this.validateString('name', body.name, 255));

        errors = errors.concat(this.validateString('email', body.email, 255));

        errors = errors.concat(this.validateString('password', body.password, 255));

        if (errors.length)
            throw new ValidationExcepion('Validation UserModel faild', errors);
    }

    validateLoginRequest(body) {
        var errors = [];

        errors = errors.concat(this.validateString('email', body.email, 255));

        errors = errors.concat(this.validateString('password', body.password, 255));

        if (errors.length)
            throw new ValidationExcepion('Validation UserModel faild', errors);
    }

    validateLength(body) {
        var errors = [];

        errors = errors.concat(this.validateMaxLengthString('name', body.name, 255));

        errors = errors.concat(this.validateMaxLengthString('email', body.email, 255));

        errors = errors.concat(this.validateMaxLengthString('password', body.password, 255));

        if (errors.length)
            throw new ValidationExcepion('Validation UserModel faild', errors);
    }

    validateParams(params) {
        var errors = [];

        errors = errors.concat(this.validateExactLengthString('id', params.id, 36));

        if (errors.length)
            throw new ValidationExcepion('Validation Lang Params faild', errors);
    }
}

module.exports = new UserValidator();

