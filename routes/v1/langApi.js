const express = require('express');
const router = express.Router();

var logger = require('../../utils/logger.js').logger;

var langService = require('../../service/v1/LangService');

var langValidator = require('../../validators/LangValidator');

var langWrapper = require('../../wrappers/LangWrapper');

var responseUtility = require('../../utils/ResponseUtility');

var exceptionHandler = require('../../utils/ExceptionHandler');

/**
 * @typedef lang_dto
 * @property {string} isoCode.required - lang isoCode - eg: ar
 * @property {string} name.required - lang name - eg: arabic
 * @property {string} id.required - model id - eg: 0ea04144-a9b4-4280-b689-f9f157b50769
 */

/**
* @typedef success_list_dto
* @property {string} status.required - status code - eg: 200
* @property {Array.<lang_dto>} data.required - lang list
*/

/**
* List all lang api
* @route GET /lang
* @group Language Section - lang apis
* @returns {success_list_dto.model} 200 - normal response
* @returns {internal_error_respone.model} 500 - error response
*/
router.get('/', (req, res) => {
    try {

        logger.info("list all lang model");

        langService.getAll(langDaos => {
            var langDtos = langDaos.map(langDao => langWrapper.createDTO(langDao));
            responseUtility.createSuccessResponse(res, langDtos);
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

/**
* @typedef success_dto
* @property {string} status.required - status code - eg: 200
* @property {lang_dto.model} data.required - lang list
*/

/**
* get lang api
* @route GET /lang/{id}
* @group Language Section - lang apis
* @param {string} id.path.required - language id - eg: 0ea04144-a9b4-4280-b689-f9f157b50769
* @returns {success_dto.model} 200 - normal response
* @returns {not_found_dto.model} 202 - not found response
* @returns {bad_request.model} 400 - bad request response
* @returns {internal_error_respone.model} 500 - error response
*/
router.get('/:id', (req, res) => {
    try {
        langValidator.validateParams(req.params);

        const id = req.params.id;

        logger.info(`loading lang model with id: ${id}`);

        langService.getById(id, langDao => {
            if (langDao) {
                logger.info(`lang model: ${id} loaded successfully ...`);
                responseUtility.createSuccessResponse(res, langWrapper.createDTO(langDao));
            } else {
                logger.info(`lang model: ${id} not found`);
                responseUtility.createNotFoundResponse(res);
            }
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

/**
 * @typedef lang_body
 * @property {string} isoCode.required - lang isoCode - eg: ar
 * @property {string} name.required - lang name - eg: arabic
 */

/**
* add lang api
* @route POST /lang
* @group Language Section - lang apis
* @param {lang_body.model} body.body.required - language body
* @returns {success_dto.model} 201 - normal response:
* @returns {bad_request.model} 400 - bad request response
* @returns {internal_error_respone.model} 500 - error response
*/
router.post('/', (req, res) => {

    try {
        langValidator.validate(req.body);

        langService.save(req.body, model => {
            logger.info("lang model saved successfully ...");
            responseUtility.createCreatedResponse(res, langWrapper.createDTO(model));
        }, exception => {
            exceptionHandler.handle(res, exception);
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

/**
* add lang api
* @route PATCH /lang/{id}
* @group Language Section - lang apis
* @param {lang_body.model} body.body - language body
* @returns {success_dto.model} 200 - normal response
* @returns {bad_request.model} 400 - bad request response
* @returns {internal_error_respone.model} 500 - error response
*/
router.patch('/:id', (req, res) => {
    try {

        langValidator.validateParams(req.params);

        langValidator.validateLength(req.body);

        const id = req.params.id;

        langService.update(id, req.body, model => {
            logger.info(`lang model ${id} updated successfully ...`);
            responseUtility.createCreatedResponse(res, langWrapper.createDTO(model));
        }, exception => {
            exceptionHandler.handle(res, exception);
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

/**
* get lang api
* @route DELETE /lang/{id}
* @group Language Section - lang apis
* @param {string} id.path.required - language id - eg: 0ea04144-a9b4-4280-b689-f9f157b50769
* @returns {object} 200 - eg: { "status": 200, "data": "number of deleted rows: 1" }
* @returns {bad_request.model} 400 - bad request response
* @returns {internal_error_respone.model} 500 - error response
*/
router.delete('/:id', (req, res) => {

    try {
        langValidator.validateParams(req.params);

        const id = req.params.id;

        langService.delete(id, deletedOwner => {
            logger.info(`lang model: ${id} deleted successfully ...`);
            responseUtility.createSuccessResponse(res,
                `number of deleted rows: ${deletedOwner}`
            );
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

module.exports = router;
