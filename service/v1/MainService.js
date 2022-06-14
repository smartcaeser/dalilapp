
var logger = require('../../utils/logger.js').logger;

var DAO = require('../../DAO');

var Contact = require('../../DAO/Contact');

var User = require('../../DAO/User');

const Op = require('sequelize').Op;

// var GenericWrapper = require(`../../wrappers/GenericWrapper`);

// let wrapper = new GenericWrapper("Contact");

// var BaseService = require('./Base/BaseService')

// const baseService = new BaseService('Contact', wrapper);

module.exports = {

    sync: (userId, callback) => {
        User
            .findByPk(userId)
            .then(user => {

                let now = new Date();

                let syncDate = user.syncDate;

                Contact.findAll({
                    where: {
                        [Op.or]: [{
                            createdAt: {
                                [Op.between]: [syncDate, now]
                            }
                        },
                        {
                            updatedAt: {
                                [Op.between]: [syncDate, now]
                            }
                        }]
                    }
                }, {
                    include: Contact.includes
                }).then(dao => {
                    user.syncDate = now;

                    user.save();

                    callback(dao);
                });
            }).catch(exception => {
                logger.error("error while sync", exception);
                callback(null);
            });
    },


}