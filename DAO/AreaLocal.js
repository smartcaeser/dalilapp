const BaseLocalValueDAO = require('./base/BaseLocalValueDAO.js');
const Sequelize = require('sequelize');

class AreaLocal extends BaseLocalValueDAO {

}

AreaLocal.init(
    BaseLocalValueDAO.tableAttributes, {
    sequelize,
    modelName: 'lk_area_local'
});

AreaLocal.daoName = 'AreaLocal';

AreaLocal.tableAttributes = BaseLocalValueDAO.tableAttributes;

module.exports = AreaLocal;