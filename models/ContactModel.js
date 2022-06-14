
const StatusBaseModel = require('./Base/BaseModel');

class ContactModel extends StatusBaseModel {

    static createModel() {
        return new ContactModel();
    }

    constructor() {
        super();
        this.name = "";
        this.number = "";
        this.address = "";
        this.description = "";
        this.longitude = "";
        this.latitudes = "";
        this.type = "";
        this.imgae = "";
        this.lk_area_id = "l_k_area_id";
        this.lk_city_id = "l_k_city_id";
        this.lk_governorate_id = "l_k_governorate_id";
        this.optin = "";
        this.optout = "";
        this.workingHours = "";
        this.fbPage = "";
        this.tags = [];
    }
}


module.exports = ContactModel;