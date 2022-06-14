const BaseLocalValueDAO = require('./base/BaseLocalValueDAO.js');
const Sequelize = require('sequelize');

class TypeLocal extends BaseLocalValueDAO {

}

TypeLocal.init(
    BaseLocalValueDAO.tableAttributes, {
    sequelize,
    modelName: 'lk_type_local'
});

TypeLocal.daoName = 'TypeLocal';

TypeLocal.tableAttributes = BaseLocalValueDAO.tableAttributes;

module.exports = TypeLocal;