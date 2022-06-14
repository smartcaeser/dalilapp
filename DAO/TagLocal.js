const BaseLocalValueDAO = require('./base/BaseLocalValueDAO.js');
const Sequelize = require('sequelize');

class TagLocal extends BaseLocalValueDAO {

}
TagLocal.init(
    BaseLocalValueDAO.tableAttributes, {
    sequelize,
    modelName: 'lk_tag_local'
});

TagLocal.daoName = 'TagLocal';

TagLocal.tableAttributes = BaseLocalValueDAO.tableAttributes;

module.exports = TagLocal;