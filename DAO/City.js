const BaseLocalDAO = require('./base/BaseLocalDAO');
const CityLocal = require('./CityLocal');
const Lang = require('./Lang');
const Sequelize = require('sequelize');
const Area = require('./Area');
const Contact = require('./Contact');

class City extends BaseLocalDAO {

}
City.init(
    BaseLocalDAO.tableAttributes, {
    sequelize,
    modelName: 'lk_city'
});

City.daoName = 'City';

City.tableAttributes = BaseLocalDAO.tableAttributes;

City.cityLocals = City.hasMany(CityLocal, {
    as: 'cityLocals',
    unique: false,
    foreignKey: 'LK_city_id'
});

City.areas = City.hasMany(Area, {
    as: 'areas',
    unique: false,
    foreignKey: 'LK_city_id'
});

City.belongsToMany(Lang, { through: 'LK_City_Local',foreignKey: 'LK_city_id' });

City.includes = [
    { model: CityLocal, as: 'cityLocals', foreignKey: 'LK_city_id' },
    { model: Area, as: 'areas', foreignKey: 'LK_city_id' }
];

City.hasMany(Contact, {foreignKey: 'LK_city_id'});

module.exports = City;
