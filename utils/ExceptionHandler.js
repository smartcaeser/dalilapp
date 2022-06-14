var logger = require('./logger.js').logger;

var responseUtility = require('./ResponseUtility.js');

var util = require('util');

module.exports.handle = function (response, exception) {
    if (exception.name == 'SequelizeUniqueConstraintError') {
        handleSequelizeUniqueConstraintError(response, exception);
    } else if (exception.name == 'SequelizeForeignKeyConstraintError') {
        handleSequelizeForeignKeyConstraintError(response, exception);
    } else if (exception.name == 'ValidationException') {
        handleValidationException(response, exception);
    } else {
        try {
            logger.error(util.inspect(exception));
        } catch (e) {
            logger.error(exception);
        }
        responseUtility.createInternalErrorResponse(response, exception);
    }
}

function handleSequelizeUniqueConstraintError(response, exception) {

    logger.error(exception.message + ": " + exception.original.message);

    responseUtility.createBadRequestResponse(response, exception.errors.map(error => {
        return {
            field: error.path,
            value: error.value,
            error: error.message
        }
    }));
}
function handleSequelizeForeignKeyConstraintError(response, exception) {

    logger.error(exception.message + ": " + exception.original.message);

    responseUtility.createBadRequestResponse(response, {
        field: exception.index,
        value: exception.table,
        error: exception.message
    });
}

function handleValidationException(response, exception) {

    logger.error(exception.message + " " + util.inspect(exception.errors));

    responseUtility.createBadRequestResponse(response, exception.errors);
}

