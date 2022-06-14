const ValidationExcepion = require('../exceptions/ValidationExcepion');

const CommonValidator = require('./CommonValidator');

class ContactValidator extends CommonValidator {

    validate(body) {
        var errors = [];

        errors = errors.concat(this.validateString('name', body.name, 255));

        errors = errors.concat(this.validateString('number', body.number, 255));
        
        errors = errors.concat(this.validateString('address', body.address, 255));
        
        errors = errors.concat(this.validateMaxLengthString('longitude', body.longitude, 255));
        
        errors = errors.concat(this.validateMaxLengthString('latitudes', body.latitudes, 255));

        errors = errors.concat(this.validateMaxLengthString('imgae', body.imgae, 10000));

        if (errors.length)
            throw new ValidationExcepion('Validation ContactModel faild', errors);
    }

    validateLength(body) {
        var errors = [];

        errors = errors.concat(this.validateMaxLengthString('name', body.name, 255));

        errors = errors.concat(this.validateMaxLengthString('number', body.number, 255));
        
        errors = errors.concat(this.validateMaxLengthString('address', body.address, 255));
        
        errors = errors.concat(this.validateMaxLengthString('longitude', body.longitude, 255));
        
        errors = errors.concat(this.validateMaxLengthString('latitudes', body.latitudes, 255));

        errors = errors.concat(this.validateMaxLengthString('imgae', body.imgae, 10000));

        if (errors.length)
            throw new ValidationExcepion('Validation LangModel faild', errors);
    }

    validateParams(params) {
        var errors = [];

        errors = errors.concat(this.validateExactLengthString('id', params.id, 36));

        if (errors.length)
            throw new ValidationExcepion('Validation Lang Params faild', errors);
    }

    validateAddTag(params, body) {
        var errors = [];

        errors = errors.concat(this.validateExactLengthString('id', params.id, 36));

        errors = errors.concat(this.validateString('tagId', body.tagId, 36));

        if (errors.length)
            throw new ValidationExcepion('Validation Lang Params faild', errors);
    }

    validateDeleteTag(params) {
        var errors = [];

        errors = errors.concat(this.validateString('tagId', params.contactTagId, 36));

        if (errors.length)
            throw new ValidationExcepion('Validation Lang Params faild', errors);
    }
}

module.exports = new ContactValidator();

