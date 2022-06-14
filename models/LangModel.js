
const BaseModel = require('./Base/BaseModel');

class LangModel extends BaseModel {

    static createModel() {
        return new LangModel();
    }

    constructor() {
        super();
        this.isoCode = "";
    }
}


module.exports = LangModel;