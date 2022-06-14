'use strict';

var path = require('path');

var Sequelize = require('sequelize');

var basename = path.basename(__filename);

const listDirUtility = require('../utils/listDirFiles');

var dbConfig = require('./../database/DBConfig');

var DAO = {};


listDirUtility.list(__dirname, [basename], function (file) {
  var model = require('./' + file);
  DAO[model.name] = model;
});

//sync();


DAO.sequelize = sequelize;
DAO.Sequelize = Sequelize;

module.exports = DAO;
