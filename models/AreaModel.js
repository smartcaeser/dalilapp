
const LocalizedModel = require('./Base/LocalizedModel');

class AreaModel extends LocalizedModel { 

    static createModel() {
        return new AreaModel();
    }

    constructor() { 
        super();
    }
}


module.exports = AreaModel;