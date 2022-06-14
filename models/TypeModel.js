
const LocalizedModel = require('./Base/LocalizedModel');

class TypeModel extends LocalizedModel { 

    static createModel() {
        return new TypeModel();
    }

    constructor() { 
        super();
    }
}


module.exports = TypeModel;