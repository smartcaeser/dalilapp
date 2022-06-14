const ValidationExcepion = require('../exceptions/ValidationExcepion');

const CommonValidator = require('./CommonValidator');

class LangValidator extends CommonValidator {

    validate(lang) {
        var errors = [];

        errors = errors.concat(this.validateString('isoCode', lang.isoCode, 255));

        errors = errors.concat(this.validateMaxLengthString('name', lang.name, 255));

        if (errors.length)
            throw new ValidationExcepion('Validation LangModel faild', errors);
    }

    validateLength(lang) {
        var errors = [];

        errors = errors.concat(this.validateMaxLengthString('isoCode', lang.isoCode, 255));

        errors = errors.concat(this.validateMaxLengthString('name', lang.name, 255));

        if (errors.length)
            throw new ValidationExcepion('Validation LangModel faild', errors);
    }

    validateParams(params) {
        var errors = [];

        errors = errors.concat(this.validateMaxLengthString('isoCode', params.isoCode, 255));

        if (errors.length)
            throw new ValidationExcepion('Validation Lang Params faild', errors);
    }
}

module.exports = new LangValidator();

