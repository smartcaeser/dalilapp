const ValidationExcepion = require('../exceptions/ValidationExcepion');

const CommonValidator = require('./CommonValidator');

class LocalizedValidator extends CommonValidator {

    validate(localized) {
        var errors = [];

        errors = errors.concat(this.validateMaxLengthString('name', localized.name, 255));

        if (localized.locals)
            errors = errors.concat(this.validateLocals(localized.locals));

        if (errors.length)
            throw new ValidationExcepion('Validation CityModel faild', errors);
    }

    validateLength(localized) {
        var errors = [];

        errors = errors.concat(this.validateMaxLengthString('name', localized.name, 255));

        if (errors.length)
            throw new ValidationExcepion('Validation LangModel faild', errors);
    }

    validateParams(params) {
        var errors = [];

        errors = errors.concat(this.validateExactLengthString('id', params.id, 36));

        if (errors.length)
            throw new ValidationExcepion('Validation Lang Params faild', errors);
    }

    validateLocalParams(params) {
        var errors = [];

        errors = errors.concat(this.validateExactLengthString('id', params.id, 36));

        errors = errors.concat(this.validateMaxLengthString('LKLangIsoCode', params.LKLangIsoCode, 255));

        if (errors.length)
            throw new ValidationExcepion('Validation Lang Params faild', errors);
    }
}

module.exports = new LocalizedValidator();
