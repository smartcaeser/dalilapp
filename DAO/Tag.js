const BaseLocalDAO = require('./base/BaseLocalDAO');
const TagLocal = require('./TagLocal');
const Lang = require('./Lang');
const Sequelize = require('sequelize');

class Tag extends BaseLocalDAO {

}

Tag.tableAttributes = {};

let keys = Object.keys(BaseLocalDAO.tableAttributes);
for (let key of keys) {
    Tag.tableAttributes[key] = BaseLocalDAO.tableAttributes[key];
}

Tag.tableAttributes.description = {
    type: Sequelize.STRING,
    allowNull: true,
    field: "description"
};

Tag.tableAttributes.sponsoredBy = {
    type: Sequelize.STRING,
    allowNull: true,
    field: "sponsored_by"
};

Tag.tableAttributes.image = {
    type: Sequelize.TEXT,
    allowNull: true,
    field: "image"
};

Tag.init(
    Tag.tableAttributes, {
    sequelize,
    modelName: 'lk_tag'
});

Tag.daoName = 'Tag';

Tag.tagLocals = Tag.hasMany(TagLocal, {
    as: 'tagLocals',
    unique: false,
    foreignKey: 'LK_tag_id'
});

Tag.subTags = Tag.hasMany(Tag, {
    as: 'subTags',
    unique: false,
    foreignKey: 'LK_tag_id'
});

Tag.belongsToMany(Lang, { through: 'LK_Tag_Local', foreignKey: 'LK_tag_id' });

Tag.includes = [
    { model: TagLocal, as: 'tagLocals', foreignKey: 'LK_tag_id' }
];

module.exports = Tag;

