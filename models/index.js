'use strict';

var path = require('path');
var basename = path.basename(__filename);
const listDirUtility = require('../utils/listDirFiles');

var models = {}

var LocalizedModel = require('./Base/LocalizedModel');
var BaseModel = require('./Base/BaseModel');
var BasicModel = require('./Base/BasicModel');

listDirUtility.list(__dirname, [basename], function (file) {
    var model = require(path.join(__dirname, file));
    models[model.name] = model;
})

addAccessors();

function addAccessors() {
    Object.keys(models).forEach(model => {
        var modelObject = models[model].createModel();
        addAccessorsForModel(modelObject);
        addLocalAccessorsForModel(modelObject);
    });
}

function addAccessorsForModel(model) {
    Object.keys(model).forEach(attribute => {
        addAccessorsForModelAttribute(model, attribute);
    });
}

function addLocalAccessorsForModel(model) {
    if (model instanceof LocalizedModel) {
        model.__proto__['getLocalValue'] = function (local) {
            return this.locals[local];
        };
        model.__proto__['setLocalValue'] = function (local, value) {
            return this.locals[local] = value;
        };
    }
}

function addAccessorsForModelAttribute(model, attribute) {
    addSetterObjectForModelAttribute(model, attribute);
    addGetterObjectForModelAttribute(model, attribute);
    addAddingForModelAttribute(model, attribute);
}

function addAddingForModelAttribute(model, attribute) {
    if (model[attribute] instanceof Array)
        model.__proto__['add' + makeNmaeSingular(camelCase(attribute))] = function (value) {
            this[attribute].push(value);
        };
}

function addSetterObjectForModelAttribute(model, attribute) {
    model.__proto__['set' + camelCase(attribute)] = function (value) {
        this[attribute] = value;
    };
}

function addGetterObjectForModelAttribute(model, attribute) {
    model.__proto__['get' + camelCase(attribute)] = function () {
        return this[attribute];
    };
}

function camelCase(attributeName) {
    var camelCaseStr = attributeName.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
        return chr.toUpperCase();
    });
    return camelCaseStr.slice(0, 1).toUpperCase() + camelCaseStr.slice(1);
}

function makeNmaeSingular(attributeName) {
    if (attributeName.slice(attributeName.length - 1) == 's')
        return attributeName.slice(0, attributeName.length - 1);
}

module.exports = models;