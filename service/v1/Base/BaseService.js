
var logger = require('../../../utils/logger.js').logger;

var util = require('util');

var DAO = require('../../../DAO');

const ValidationExcepion = require('../../../exceptions/ValidationExcepion');

class BaseService {

    constructor(daoName, wrapper) {
        this.daoName = daoName;
        this.wrapper = wrapper;
        this.daoModel = require(`../../../DAO/${this.daoName}`);
    }

    get(conditions, callback) {
        this.daoModel.findAll(conditions).then(
            daos => {
                callback(daos);
            }
        );
    }

    getAll(callback) {
        this.daoModel.findAll().then(
            daos => {
                callback(daos);
            }
        );
    }

    getAllWithIncludes(callback) {
        this.daoModel.findAll({
            include: this.daoModel.includes
        }).then(
            daos => {
                callback(daos);
            }
        );
    }

    getById(id, callback) {
        this.daoModel.findByPk(id).then(
            dao => {
                callback(dao);
            }
        );
    }

    getByIdWithIncludes(id, callback) {
        this.daoModel.findByPk(id, {
            include: this.daoModel.includes
        }).then(
            dao => {
                callback(dao);
            }
        );
    }

    save(body, successCallback, errorCallback) {

        var dao = this.wrapper.createDAO(body);

        logger.info(`adding ${this.daoName} model: ${util.inspect(body)}`);

        sequelize.transaction(t => {
            return dao.save({ transaction: t });
        }).then(result => {
            successCallback(result);
        }).catch(err => {
            errorCallback(err);
        });
    }

    update(id, body, successCallback, errorCallback) {

        logger.info(`update ${this.daoName} model with id: ${id}`);

        this.daoModel.findByPk(id).then(dao => {
            logger.info(`${this.daoName} model new values: ${util.inspect(body)}`);
            if (dao)
                return dao.update(body)
            else
                throw new Error(`Model with id: ${id}, Not Found`);
        }).then(model => {
            model.locals = undefined;
            successCallback(model);
        }).catch(exception => {
            errorCallback(exception);
        });
    }

    delete(id, callback) {

        logger.info(`delete ${this.daoName} model with id: ${id}`);

        this.daoModel.destroy({
            where: { id: id }
        }).then(deletedOwner => {
            callback(deletedOwner);
        });
    }

}

module.exports = BaseService;