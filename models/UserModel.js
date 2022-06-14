
const StatusBaseModel = require('./Base/BaseModel');

class UserModel extends StatusBaseModel {

    static createModel() {
        return new UserModel();
    }

    constructor() {
        super();
        this.id = "";
        this.name = "";
        this.email = "";
        this.syncDate = "";
    }
}


module.exports = UserModel;