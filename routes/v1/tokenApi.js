const express = require('express');
const router = express.Router();

var logger = require('../../utils/logger.js').logger;

var BaseService = require('../../service/v1/Base/BaseService');

var mainService = require('../../service/v1/MainService');

var GenericWrapper = require('../../wrappers/GenericWrapper');

var responseUtility = require('../../utils/ResponseUtility');

var exceptionHandler = require('../../utils/ExceptionHandler');

let wrapper = new GenericWrapper("User");

var validator = require(`../../validators/UserValidator`);

var userService = new BaseService("User", wrapper);

var jwt = require('jsonwebtoken');

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
router.post('/generate-token', (req, res) => {

    try {

        validator.validateLoginRequest(req.body);

        userService.get({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }, user => {
            if (user == null || user.length != 1 || user[0].isAdmin == false) {
                logger.error("user not found with the password");

                res.status(403).send({ auth: false });
            } else {

                logger.info("user login successfully ...");

                var token = jwt.sign({ email: user[0].email, }, "config.secret that is my big secrt in the life", {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.status(200).send({ status: 200, auth: true, token: token });
            }
        }, exception => {

            logger.error(util.inspect(exception));

            res.status(403).send({ auth: false });
        });

    } catch (exception) {
        exceptionHandler.handle(res, exception);
    }
});

module.exports = router;
