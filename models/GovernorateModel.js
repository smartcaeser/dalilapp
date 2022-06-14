
const LocalizedModel = require('./Base/LocalizedModel');

class GovernorateModel extends LocalizedModel { 

    static createModel() {
        return new GovernorateModel();
    }

    constructor() { 
        super();
    }
}


module.exports = GovernorateModel;