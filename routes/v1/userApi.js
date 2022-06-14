const express = require('express');
const router = express.Router();

var logger = require('../../utils/logger.js').logger;

var BaseService = require('../../service/v1/Base/BaseService');

var mainService = require('../../service/v1/MainService');

var GenericWrapper = require('../../wrappers/GenericWrapper');

var responseUtility = require('../../utils/ResponseUtility');

var exceptionHandler = require('../../utils/ExceptionHandler');

let wrapper = new GenericWrapper("User");

let contactWrapper = new GenericWrapper("Contact");

var validator = require(`../../validators/UserValidator`);

var userService = new BaseService("User", wrapper);

/**
 * @typedef user_dto
 * @property {string} isoCode.required - user isoCode - eg: ar
 * @property {string} name.required - user name - eg: arabic
 * @property {string} id.required - model id - eg: 0ea04144-a9b4-4280-b689-f9f157b50769
 */

/**
* @typedef success_list_dto
* @property {string} status.required - status code - eg: 200
* @property {Array.<user_dto>} data.required - user list
*/

/**
* List all user api
* @route GET /user
* @group User Section - user apis
* @returns {success_list_dto.model} 200 - normal response
* @returns {internal_error_respone.model} 500 - error response
*/
router.get('/admins', (req, res) => {
    try {

        logger.info("list all user model");

        userService.daoModel.findAll({ where: { isAdmin: true } }).then(userDaos => {
            var userDtos = userDaos.map(userDao => wrapper.createDTO(userDao));
            userDtos.forEach(userDto => {
                userDto['password'] = undefined;
                userDto['isAdmin'] = undefined;
            })
            responseUtility.createSuccessResponse(res, userDtos);
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});
/**
 * @typedef user_dto
 * @property {string} isoCode.required - user isoCode - eg: ar
 * @property {string} name.required - user name - eg: arabic
 * @property {string} id.required - model id - eg: 0ea04144-a9b4-4280-b689-f9f157b50769
 */

/**
* @typedef success_list_dto
* @property {string} status.required - status code - eg: 200
* @property {Array.<user_dto>} data.required - user list
*/

/**
* List all user api
* @route GET /user
* @group User Section - user apis
* @returns {success_list_dto.model} 200 - normal response
* @returns {internal_error_respone.model} 500 - error response
*/
router.get('/', (req, res) => {
    try {

        logger.info("list all user model");

        userService.daoModel.findAll({ where: { isAdmin: false } }).then(userDaos => {
            var userDtos = userDaos.map(userDao => wrapper.createDTO(userDao));
            userDtos.forEach(userDto => {
                userDto['password'] = undefined;
                userDto['isAdmin'] = undefined;
            })
            responseUtility.createSuccessResponse(res, userDtos);
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

router.get('/:id/sync', (req, res) => {
    try {
        validator.validateParams(req.params);

        const id = req.params.id;

        logger.info(`sync user model with id: ${id}`);

        mainService.sync(id, contacts => {
            if (contacts) {
                logger.info(`contacts for user model: ${id} loaded successfully ...`);
                responseUtility.createSuccessResponse(res, contactWrapper.createDTO(contacts));
            } else {
                logger.info(`user model: ${id} not found`);
                responseUtility.createNotFoundResponse(res);
            }
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

/**
* @typedef success_dto
* @property {string} status.required - status code - eg: 200
* @property {user_dto.model} data.required - user list
*/

/**
* get user api
* @route GET /user/{id}
* @group User Section - user apis
* @param {string} id.path.required - language id - eg: 0ea04144-a9b4-4280-b689-f9f157b50769
* @returns {success_dto.model} 200 - normal response
* @returns {not_found_dto.model} 202 - not found response
* @returns {bad_request.model} 400 - bad request response
* @returns {internal_error_respone.model} 500 - error response
*/
router.get('/:id', (req, res) => {
    try {
        validator.validateParams(req.params);

        const id = req.params.id;

        logger.info(`loading user model with id: ${id}`);

        userService.getById(id, userDao => {
            if (userDao) {
                logger.info(`user model: ${id} loaded successfully ...`);
                userDao['password'] = undefined;
                userDao['isAdmin'] = undefined;
                responseUtility.createSuccessResponse(res, wrapper.createDTO(userDao));
            } else {
                logger.info(`user model: ${id} not found`);
                responseUtility.createNotFoundResponse(res);
            }
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

/**
 * @typedef user_body
 * @property {string} isoCode.required - user isoCode - eg: ar
 * @property {string} name.required - user name - eg: arabic
 */

/**
* add user api
* @route POST /user
* @group User Section - user apis
* @param {user_body.model} body.body.required - language body
* @returns {success_dto.model} 201 - normal response:
* @returns {bad_request.model} 400 - bad request response
* @returns {internal_error_respone.model} 500 - error response
*/
router.post('/', (req, res) => {

    try {

        validator.validate(req.body);

        var date = new Date();
        date.setFullYear(date.getFullYear() - 100);
        req.body.syncDate = date;

        userService.save(req.body, model => {
            logger.info("user model saved successfully ...");
            responseUtility.createCreatedResponse(res, wrapper.createDTO(model));
        }, exception => {
            exceptionHandler.handle(res, exception);
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

/**
* add user api
* @route PATCH /user/{id}
* @group User Section - user apis
* @param {user_body.model} body.body - language body
* @returns {success_dto.model} 200 - normal response
* @returns {bad_request.model} 400 - bad request response
* @returns {internal_error_respone.model} 500 - error response
*/
router.patch('/:id', (req, res) => {
    try {

        validator.validateParams(req.params);

        validator.validateLength(req.body);

        const id = req.params.id;

        userService.update(id, req.body, model => {
            logger.info(`user model ${id} updated successfully ...`);
            responseUtility.createCreatedResponse(res, wrapper.createDTO(model));
        }, exception => {
            exceptionHandler.handle(res, exception);
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

/**
* get user api
* @route DELETE /user/{id}
* @group User Section - user apis
* @param {string} id.path.required - language id - eg: 0ea04144-a9b4-4280-b689-f9f157b50769
* @returns {object} 200 - eg: { "status": 200, "data": "number of deleted rows: 1" }
* @returns {bad_request.model} 400 - bad request response
* @returns {internal_error_respone.model} 500 - error response
*/
router.delete('/:id', (req, res) => {

    try {
        validator.validateParams(req.params);

        const id = req.params.id;

        userService.delete(id, deletedOwner => {
            logger.info(`user model: ${id} deleted successfully ...`);
            responseUtility.createSuccessResponse(res,
                `number of deleted rows: ${deletedOwner}`
            );
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

module.exports = router;
