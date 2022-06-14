const Sequelize = require('sequelize');
const BaseDAO = require('./BaseDAO');

class BaseLocalDAO extends BaseDAO {

    get name() {
        return this.name;
    }

    set name(name) {
        this.setDataValue('name', name);
    }
}

BaseLocalDAO.tableAttributes = {
    
};

Object.keys(BaseDAO.tableAttributes).forEach(key => {
    BaseLocalDAO.tableAttributes[key] = BaseDAO.tableAttributes[key];
});

BaseLocalDAO.tableAttributes.name = {
    type: Sequelize.STRING,
    allowNull: false,

}


module.exports = BaseLocalDAO;