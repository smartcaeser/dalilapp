const BaseLocalValueDAO = require('./base/BaseLocalValueDAO.js');
const Sequelize = require('sequelize');

class CityLocal extends BaseLocalValueDAO {

}
CityLocal.init(
    BaseLocalValueDAO.tableAttributes, {
    sequelize,
    modelName: 'lk_city_local'
});

CityLocal.daoName = 'CityLocal';

CityLocal.tableAttributes = BaseLocalValueDAO.tableAttributes;

module.exports = CityLocal;