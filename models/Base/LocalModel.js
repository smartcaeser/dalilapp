
const BasicModel = require('./BasicModel');

class LocalModel extends BasicModel {

    static createModel() {
        return new LocalModel();
    }

    constructor() {
        super();
        this.local = "";
        this.value = "";
    }
}


module.exports = LocalModel;