const Sequelize = require('sequelize');
const Lang = require('../Lang');
const BaseDAO = require('./BaseDAO');

class BaseLocalValueDAO extends Sequelize.Model {

    get isoCode() {
        return this.isoCode;
    }

    set isoCode(isoCode) {
        this.setDataValue('isoCode', isoCode);
    }

    get value() {
        return this.value;
    }

    set value(value) {
        this.setDataValue('value', value);
    }
}

BaseLocalValueDAO.tableAttributes = {
};

Object.keys(BaseDAO.tableAttributes).forEach(key => {
    BaseLocalValueDAO.tableAttributes[key] = BaseDAO.tableAttributes[key];
});

BaseLocalValueDAO.tableAttributes.value = {
    type: Sequelize.STRING,
    allowNull: false,
};

module.exports = BaseLocalValueDAO;