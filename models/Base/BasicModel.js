class BasicModel {

    static createModel() {
        return new BasicModel();
    }

    constructor() {
        this.id = "";
        this.key = "";
        this.createdAt = "";
        this.updatedAt = "";
        this.deletedAt = "";
    }
}


module.exports = BasicModel;