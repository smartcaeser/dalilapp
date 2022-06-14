const Sequelize = require('sequelize');

class Lang extends Sequelize.Model {

    get isoCode() {
        return this.isoCode;
    }

    set isoCode(isoCode) {
        this.setDataValue('isoCode', isoCode);
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.setDataValue('name', name);
    }
}

Lang.tableAttributes = {
    isoCode: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true,
        allowNull: false,
        // defaultValue: Sequelize.UUIDV1
    },
    name: Sequelize.STRING
};

Lang.daoName = 'Lang';

Lang.init(Lang.tableAttributes, {
    sequelize,
    modelName: 'lk_lang'
});


module.exports = Lang;