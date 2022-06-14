var BasicModel = require('./BasicModel');

class BaseModel extends BasicModel {

    static createModel() {
        return new BaseModel();
    }

    constructor() {
        super();
        this.name = "";
    }
}


module.exports = BaseModel;