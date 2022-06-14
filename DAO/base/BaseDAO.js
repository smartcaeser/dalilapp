const Sequelize = require('sequelize');

class BaseDAO extends Sequelize.Model {

    get id() {
        return this.id;
    }

    set id(id) {
        this.setDataValue('id', id);
    }
}

BaseDAO.tableAttributes = {
    id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV1
    }
};

module.exports = BaseDAO;