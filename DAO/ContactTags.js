const BaseDAO = require('./base/BaseDAO');
const Tag = require('./Tag');
const Sequelize = require('sequelize');

class ContactTags extends BaseDAO {
}

ContactTags.tableAttributes = BaseDAO.tableAttributes;

ContactTags.init(
    ContactTags.tableAttributes, {
    sequelize,
    modelName: 'contact_tags'
});

ContactTags.daoName = 'ContactTags';

// ContactTags.belongsTo(Contact, {
//     as: "contact",
//     onDelete: "RESTRICT",
//     foreignKey: {
//         allowNull: false
//     }
// });

ContactTags.belongsTo(Tag, {
    as: "tag",
    onDelete: "RESTRICT",
    foreignKey: 'LK_tag_id'
});

// Contact.includes = [
//     { model: ContactTags, as: 'contactTags' }
// ];

module.exports = ContactTags;