const BaseDAO = require('./base/BaseDAO');
const Sequelize = require('sequelize');

class User extends BaseDAO {
}

User.tableAttributes = {};

let keys = Object.keys(BaseDAO.tableAttributes);
for (let key of keys) {
    User.tableAttributes[key] = BaseDAO.tableAttributes[key];
}

User.tableAttributes.name = {
    type: Sequelize.STRING,
    allowNull: false,
    field: "name"
};

User.tableAttributes.email = {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
};

User.tableAttributes.password = {
    type: Sequelize.STRING,
    allowNull: false,
};

User.tableAttributes.syncDate = {
    type: Sequelize.DATE,
    allowNull: false,
};

User.tableAttributes.isAdmin = {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
};

User.init(
    User.tableAttributes, {
    sequelize,
    modelName: 'user',
});

User.daoName = 'user';

module.exports = User;


