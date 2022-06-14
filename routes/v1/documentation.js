/**
* @typedef error_dto
* @property {string} field.required - field name
* @property {string} value.required - value that cause error
* @property {string} error.required - error message
*/

/**
* @typedef not_found_dto
* @property {string} status.required - status code - eg: 202
*/

/**
* @typedef bad_request
* @property {string} status.required - status code - eg: 400
* @property {Array.<error_dto>} data.required - errors list
*/

/**
* @typedef internal_error_respone
* @property {string} status.required - status code - eg: 500
* @property {string} message.required - error - eg: error message or internal error message
*/

/**
* @typedef local_dto
* @property {string} isoCode.required - iso code - eg: ar
* @property {string} value.required - error - eg: error message or internal error message
*/

/**
* @typedef localized_dto
* @property {string} isoCode.required - iso code - eg: ar
* @property {string} modelId.required - iso code - eg: e528ab66-0493-4c15-8780-55ee971f28df
* @property {string} value.required - error - eg: error message or internal error message
*/