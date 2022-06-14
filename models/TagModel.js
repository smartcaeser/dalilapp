
const LocalizedModel = require('./Base/LocalizedModel');

class TagModel extends LocalizedModel { 

    static createModel() {
        return new TagModel();
    }

    constructor() { 
        super();
        this.sponsoredBy = "";
        this.image = "";
    }
}


module.exports = TagModel;