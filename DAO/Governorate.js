const BaseLocalDAO = require('./base/BaseLocalDAO');
const GovernorateLocal = require('./GovernorateLocal');
const Lang = require('./Lang');
const Sequelize = require('sequelize');
const City = require('./City');
const Contact = require('./Contact');

class Governorate extends BaseLocalDAO {}

Governorate.init(
    BaseLocalDAO.tableAttributes, {
    sequelize,
    modelName: 'lk_governorate'
});

Governorate.daoName = 'Governorate';

Governorate.tableAttributes = BaseLocalDAO.tableAttributes;

Governorate.governorateLocals = Governorate.hasMany(GovernorateLocal, {
    as: 'governorateLocals',
    unique: false,
    foreignKey:'LK_governorate_id'
});

Governorate.cities = Governorate.hasMany(City, {
    as: 'cities',
    unique: false,
    foreignKey: 'LK_governorate_id'
});

Governorate.belongsToMany(Lang, { through: 'LK_Governorate_Local', foreignKey: 'LK_governorate_id' });


Governorate.includes = [
    { model: GovernorateLocal, as: 'governorateLocals' },
    { model: City, as: 'cities' }
];

Governorate.hasMany(Contact, {foreignKey: 'LK_governorate_id'});

module.exports = Governorate;