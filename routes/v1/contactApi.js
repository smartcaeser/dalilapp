const express = require('express');
const router = express.Router();

var logger = require('../../utils/logger.js').logger;

var BaseService = require('../../service/v1/Base/BaseService');

var GenericWrapper = require('../../wrappers/GenericWrapper');

var responseUtility = require('../../utils/ResponseUtility');

var exceptionHandler = require('../../utils/ExceptionHandler');

let wrapper = new GenericWrapper("Contact");

var validator = require(`../../validators/ContactValidator`);

var service = new BaseService("Contact", wrapper);

let contactTagsWrapper = new GenericWrapper("ContactTags");

var contactTagService = new BaseService("ContactTags", contactTagsWrapper);

/**
 * @typedef contact_dto
 * @property {string} isoCode.required - contact isoCode - eg: ar
 * @property {string} name.required - contact name - eg: arabic
 * @property {string} id.required - model id - eg: 0ea04144-a9b4-4280-b689-f9f157b50769
 */

/**
* @typedef success_list_dto
* @property {string} status.required - status code - eg: 200
* @property {Array.<contact_dto>} data.required - contact list
*/

/**
* List all contact api
* @route GET /contact
* @group Contact Section - contact apis
* @returns {success_list_dto.model} 200 - normal response
* @returns {internal_error_respone.model} 500 - error response
*/
router.get('/', (req, res) => {
    try {

        logger.info("list all contact model");

        service.getAllWithIncludes(contactDaos => {
            var contactDtos = contactDaos.map(contactDao => wrapper.createDTO(contactDao));
			//contactDtos = contactDtos.filter(item => !item.contactTags.find(cn => cn.LK_tag_id == '0638ceb0-6875-11ea-9bbc-6b23cad59cbe' || cn.LK_tag_id == '19f1e160-4766-11ea-8147-a1661da3ceb6'));
            responseUtility.createSuccessResponse(res, contactDtos);
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

/**
* @typedef success_dto
* @property {string} status.required - status code - eg: 200
* @property {contact_dto.model} data.required - contact list
*/

/**
* get contact api
* @route GET /contact/{id}
* @group Contact Section - contact apis
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

        logger.info(`loading contact model with id: ${id}`);

        service.getByIdWithIncludes(id, contactDao => {
            if (contactDao) {
                logger.info(`contact model: ${id} loaded successfully ...`);
                responseUtility.createSuccessResponse(res, wrapper.createDTO(contactDao));
            } else {
                logger.info(`contact model: ${id} not found`);
                responseUtility.createNotFoundResponse(res);
            }
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

/**
 * @typedef contact_tag_body
 * @property {string} tagId.required - contact tag id - eg: 0ea04144-a9b4-4280-b689-f9f157b50769 
 */

/**
* @typedef success_contact_tag_dto
* @property {string} id.required - contact tag id - eg: 0ea04144-a9b4-4280-b689-f9f157b50769 
*/

/**
* add contact api
* @route POST /contact/{id}/tag
* @group Contact Section - contact apis
* @param {string} id.path.required - language id - eg: 0ea04144-a9b4-4280-b689-f9f157b50769
* @param {contact_tag_body.model} body.body.required - language body
* @returns {success_contact_tag_dto.model} 201 - normal response:
* @returns {bad_request.model} 400 - bad request response
* @returns {internal_error_respone.model} 500 - error response
*/
router.post('/:id/tag', (req, res) => {

    try {
        validator.validateAddTag(req.params, req.body);

        var body = {
            ContactId: req.params.id,
            LKTagId: req.body.tagId
        }

        contactTagService.save(body, model => {
            logger.info("contact tag model saved successfully ...");
            responseUtility.createCreatedResponse(res, wrapper.createDTO(model));
        }, exception => {
            exceptionHandler.handle(res, exception);
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});


/**
* get contact api
* @route DELETE /contact/tag/{contactTagId}
* @group Contact Section - contact apis
* @param {string} contactTagId.path.required - language id - eg: 0ea04144-a9b4-4280-b689-f9f157b50769
* @returns {object} 200 - eg: { "status": 200, "data": "number of deleted rows: 1" }
* @returns {bad_request.model} 400 - bad request response
* @returns {internal_error_respone.model} 500 - error response
*/
router.delete('/tag/:contactTagId', (req, res) => {

    try {
        validator.validateDeleteTag(req.params);

        contactTagService.delete(req.params.contactTagId, deletedOwner => {
            logger.info("contact tag model deleted successfully ...");
            responseUtility.createSuccessResponse(res,
                `number of deleted rows: ${deletedOwner}`
            );
        }, exception => {
            exceptionHandler.handle(res, exception);
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

/**
 * @typedef contact_body
 * @property {string} isoCode.required - contact isoCode - eg: ar
 * @property {string} name.required - contact name - eg: arabic
 */

/**
* add contact api
* @route POST /contact
* @group Contact Section - contact apis
* @param {contact_body.model} body.body.required - language body
* @returns {success_dto.model} 201 - normal response:
* @returns {bad_request.model} 400 - bad request response
* @returns {internal_error_respone.model} 500 - error response
*/
router.post('/', (req, res) => {

    try {

        validator.validateParams(req.params);

        service.save(req.body, model => {
            logger.info("contact model saved successfully ...");
            responseUtility.createCreatedResponse(res, wrapper.createDTO(model));
        }, exception => {
            exceptionHandler.handle(res, exception);
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

/**
* add contact api
* @route PATCH /contact/{id}
* @group Contact Section - contact apis
* @param {contact_body.model} body.body - language body
* @returns {success_dto.model} 200 - normal response
* @returns {bad_request.model} 400 - bad request response
* @returns {internal_error_respone.model} 500 - error response
*/
router.patch('/:id', (req, res) => {
    try {

        validator.validateParams(req.params);

        validator.validateLength(req.body);

        const id = req.params.id;


        if (req.body['contactTags']) {
            contactTagService.daoModel.destroy({
                force: true,
                where: { contactId: id }
            }).then(deletedOwner => {
                console.log(`number of delete: ${deletedOwner}`);
                req.body['contactTags'].forEach(element => {
                    console.log("common user",element.LK_tag_id);
                    var body = {
                        contactId: id,
                        LK_tag_id: element.LK_tag_id
                    };


                    contactTagService.save(body, model => {
                        logger.info("contact tag model saved successfully ...");
                        // responseUtility.createCreatedResponse(res, wrapper.createDTO(model));
                    }, exception => {
                        // exceptionHandler.handle(res, exception);
                    });
                });
            });
        }

        service.update(id, req.body, model => {
            logger.info(`contact model ${id} updated successfully ...`);
            responseUtility.createCreatedResponse(res, wrapper.createDTO(model));
        }, exception => {
            exceptionHandler.handle(res, exception);
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

/**
* get contact api
* @route DELETE /contact/{id}
* @group Contact Section - contact apis
* @param {string} id.path.required - language id - eg: 0ea04144-a9b4-4280-b689-f9f157b50769
* @returns {object} 200 - eg: { "status": 200, "data": "number of deleted rows: 1" }
* @returns {bad_request.model} 400 - bad request response
* @returns {internal_error_respone.model} 500 - error response
*/
router.delete('/:id', (req, res) => {

    try {
        validator.validateParams(req.params);

        const id = req.params.id;

        contactTagService.daoModel.destroy({
            force: true,
            where: { contactId: id }
        });

        service.delete(id, deletedOwner => {
            logger.info(`contact model: ${id} deleted successfully ...`);
            responseUtility.createSuccessResponse(res,
                `number of deleted rows: ${deletedOwner}`
            );
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

module.exports = router;
