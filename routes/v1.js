const express = require('express');
const router = express.Router();

var path = require('path');
var version = 'v1';

const listDirUtility = require('../utils/listDirFiles');

listDirUtility.list(path.join(__dirname, version), ['documentation.js', 'localizedApi.js'], function (file) {
    var route = require(path.join(__dirname, version, file));
    router.use('/' + file.slice(0, -6), route);
})

var localizedApi = ['Area', 'City', 'Governorate', 'Type', 'Tag'];

localizedApi.forEach(api => {
    var route = require(path.join(__dirname, version, 'localizedApi.js'))(api);
    router.use('/', route);
    
});


module.exports = router;
