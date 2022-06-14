
const BaseModel = require('./BaseModel');
const LocalModel = require('./LocalModel');

class LocalizedModel extends BaseModel {

    static createModel() {
        return new LocalizedModel();
    }

    constructor() {
        super();
        this.locals = {};
    }
}


module.exports = LocalizedModel;