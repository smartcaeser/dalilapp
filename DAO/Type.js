const BaseLocalDAO = require('./base/BaseLocalDAO');
const TypeLocal = require('./TypeLocal');
const Lang = require('./Lang');
const Sequelize = require('sequelize');

class Type extends BaseLocalDAO {

}
Type.init(
    BaseLocalDAO.tableAttributes, {
    sequelize,
    modelName: 'lk_type'
});

Type.daoName = 'Type';

Type.tableAttributes = BaseLocalDAO.tableAttributes;

Type.typeLocals = Type.hasMany(TypeLocal, {
    as: 'typeLocals',
    unique: false
});

Type.belongsToMany(Lang, { through: 'LK_Type_Local' });

Type.includes = [
    { model: TypeLocal, as: 'typeLocals' }
];
module.exports = Type;