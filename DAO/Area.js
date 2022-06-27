const BaseLocalDAO = require('./base/BaseLocalDAO');
const AreaLocal = require('./AreaLocal');
const Lang = require('./Lang');
const Sequelize = require('sequelize');
const Contact = require('./Contact');

class Area extends BaseLocalDAO {}

Area.init(
    BaseLocalDAO.tableAttributes, {
    sequelize,
    modelName: 'lk_area',
});

Area.daoName = 'Area';

Area.tableAttributes = BaseLocalDAO.tableAttributes;

Area.areaLocals = Area.hasMany(AreaLocal, {
    as: 'areaLocals',
    unique: false,
    foreignKey: 'LK_area_id'
});

Area.belongsToMany(Lang, { through: 'LK_Area_Local',foreignKey: 'LK_area_id' });

Area.includes = [
    { model: AreaLocal, as: 'areaLocals', foreignKey: 'LK_area_id' }
];

Area.hasMany(Contact, {foreignKey: 'LK_area_id'});

module.exports = Area;