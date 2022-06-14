
var logger = require('../../../utils/logger.js').logger;

var util = require('util');

var DAO = require('../../../DAO');

const ValidationExcepion = require('../../../exceptions/ValidationExcepion');

const BaseService = require('./BaseService');

class BaseServiceLocal extends BaseService {

    constructor(daoName, wrapper) {

        super(daoName, wrapper);

        this.daoLocalModel = require(`../../../DAO/${daoName}Local`);
    }

    deleteLocal(id, isoCode, callback) {

        logger.info(`delete ${this.daoName} local with id: ${id}, isoCode: ${isoCode}`);

        var where = {
            l_k_lang_iso_code: isoCode
        };

        where[`LK${this.daoName}Id`] = id;

        this.daoLocalModel.destroy({
            force: true,
            where: where
        }).then(deletedOwner => {
            callback(deletedOwner);
        });
    }

    saveLocal(modelId, body, successCallback, errorCallback) {

        var dao = this.wrapper.createLocalDAO(modelId, body);

        logger.info(`adding local for ${this.daoName} model: ${util.inspect(body)}`);

        this.daoModel.findByPk(modelId).then(modelDao => {
            return dao.save();
        }).then(result => {
            successCallback(result);
        }).catch(err => {
            errorCallback(err);
        });
    }

    updateLocal(modelId, isoCode, body, successCallback, errorCallback) {


        logger.info(`updating local for ${this.daoName} model: ${util.inspect(body)}`);
        var where = {
            LKLangIsoCode: isoCode
        };

        where[`LK${this.daoName}Id`] = modelId;

        this.daoLocalModel.findOne({
            where: where
        }).then(modelDao => {
            if (modelDao)
                return modelDao.update(body);
            else
                throw new ValidationExcepion(`no local in model id: ${modelId} with isoCode: ${isoCode}`, {
                    field: "id or isoCode",
                    value: `${modelId} - ${isoCode}`,
                    error: `no local in model id: ${modelId} with isoCode: ${isoCode}`
                })
        }).then(result => {
            successCallback(result);
        }).catch(err => {
            errorCallback(err);
        });

    }
}


module.exports = BaseServiceLocal;

 // updateWithLocals: function (id, body, successCallback, errorCallback) {

    //     logger.info(`update ${this.daoName} model with id: ${id}`);

    //     // this.daoModel.findByPk(id)
    //     //     .then(dao => {
    //     //         logger.info(`${this.daoName} model new values: ${util.inspect(body)}`);
    //     //         return dao.update(body)
    //     //     }).then(model => {
    //     //         successCallback(model);
    //     //     }).catch(exception => {
    //     //         errorCallback(exception);
    //     //     });
    //     // sequelize.transaction(t => {
    //     //     return dao.save({ transaction: t });
    //     // })

    //     this.daoModel.findByPk(id, {
    //         include: [
    //             { model: this.daoLocalModel, as: 'locals' }
    //         ]
    //     }).then(function (dao) {
    //         if (dao) {

    //             return dao.update(body).then(result => {
    //                 result.locals = undefined;
    //                 successCallback(result);
    //             }).catch(err => {
    //                 errorCallback(err);
    //             });
    //             // sequelize.transaction({ autocommit: false }).then(t => {
    //             sequelize.transaction(t => {
    //                 // if (body.locals && dao.locals) {
    //                 //     body.locals.forEach(newLocal => {
    //                 //         var local = dao.locals.filter(e => e.LKLangIsoCode == newLocal.isoCode)[0];
    //                 //         if (local) {
    //                 //             // local.value = newLocal.value;

    //                 //             // newLocal.id = local.id;
    //                 //             newLocal.LKCityId = local.LKCityId;
    //                 //             newLocal.LKLangIsoCode = local.LKLangIsoCode;

    //                 //             return local.update(newLocal, { transaction: t })
    //                 //                 .then(result => {
    //                 //                     return result;
    //                 //                 });
    //                 //         } else {
    //                 //             throw new Error(`no local in model with isoCode: ${newLocal.isoCode}`)
    //                 //         }
    //                 //     });
    //                 //     // body.locals = dao.locals;
    //                 // }
    //                 // body.locals = undefined;
    //                 return dao.update(body)
    //             }).then(result => {
    //                 successCallback(result);
    //             }).catch(err => {
    //                 errorCallback(err);
    //             });
    //         } else {
    //             throw new Error("no such product type id exist to update");
    //         }
    //     }).catch(err => {
    //         errorCallback(err);
    //     });
    // },