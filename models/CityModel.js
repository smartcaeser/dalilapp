
const LocalizedModel = require('./Base/LocalizedModel');

class CityModel extends LocalizedModel { 

    static createModel() {
        return new CityModel();
    }

    constructor() { 
        super();
    }
}


module.exports = CityModel;