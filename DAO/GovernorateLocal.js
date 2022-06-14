const BaseLocalValueDAO = require('./base/BaseLocalValueDAO.js');
const Sequelize = require('sequelize');

class GovernorateLocal extends BaseLocalValueDAO {

}
GovernorateLocal.init(
    BaseLocalValueDAO.tableAttributes, {
    sequelize,
    modelName: 'lk_governorate_local'
});
GovernorateLocal.daoName = 'GovernorateLocal';

GovernorateLocal.tableAttributes = BaseLocalValueDAO.tableAttributes;

module.exports = GovernorateLocal;