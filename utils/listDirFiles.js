var fs = require('fs');

module.exports.list = function (dirPath, excludeList, callback) {

    fs.readdirSync(dirPath)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (excludeList && !excludeList.includes(file) || !excludeList) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            if (callback)
                callback(file)
        });
}