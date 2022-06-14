
const BasicModel = require('./Base/BasicModel');

class ContactTagsModel extends BasicModel { 

    static createModel() {
        return new ContactTagsModel();
    }

    constructor() { 
        super();
        this.number = "";
        this.address = "";
        this.tags = [];
    }
}


module.exports = ContactTagsModel;