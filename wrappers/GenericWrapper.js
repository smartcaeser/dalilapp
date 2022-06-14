// const DAO = require('../DAO');

class GnericWrapper {

    constructor(daoName) {
        this.daoName = daoName;
        this.modelDAO = require(`../DAO/${daoName}`);
        this.notAllowedKeies = ["createdAt", "updatedAt", "deletedAt"];
    }

    createDTO(dao) {

        var modelBody = {};

        if (this.modelDAO.tableAttributes) {
            Object.keys(this.modelDAO.tableAttributes).forEach(key => {
                if (this.isAllowedKey(key)) {
                    modelBody[key] = dao[key];
                }
            });
        }


        if (this.modelDAO.includes) {
            Object.keys(this.modelDAO.includes).forEach(index => {
                var relationModel = this.modelDAO.includes[index];
                let relationModelWrapper = new GnericWrapper(relationModel.model.daoName);

                if (dao[relationModel.as]) {
                    let relationModelValue = undefined;
                    if (Array.isArray(dao[relationModel.as])) {
                        relationModelValue = [];
                        dao[relationModel.as].forEach(value => {
                            relationModelValue.push(relationModelWrapper.createDTO(value));
                        });
                    } else {
                        relationModelValue = relationModelWrapper.createDAO(dao[relationModel.as]);
                    }
                    modelBody[relationModel.as] = relationModelValue;
                }
            });
        }

        //model.value = dao.value;

        //model.modelId = dao[`LK${daoName}Id`];

        //model.isoCode = dao[`LKLangIsoCode`];

        return modelBody;
    }

    createDAO(dto) {

        var modelBody = {};

        if (this.modelDAO.tableAttributes) {
            Object.keys(this.modelDAO.tableAttributes).forEach(key => {
                // if (this.isAllowedKey(key)) {
                modelBody[key] = dto[key];
                // }
            });
        }

        if (this.modelDAO.includes) {
            Object.keys(this.modelDAO.includes).forEach(index => {
                var relationModel = this.modelDAO.includes[index];
                let relationModelWrapper = new GnericWrapper(relationModel.model.daoName);

                if (dto[relationModel.as]) {
                    let relationModelValue = undefined;
                    if (Array.isArray(dto[relationModel.as])) {
                        relationModelValue = [];
                        dto[relationModel.as].forEach(value => {
                            relationModelValue.push(relationModelWrapper.createDAO(value));
                        });
                    } else {
                        relationModelValue = relationModelWrapper.createDAO(dto[relationModel.as]);
                    }
                    modelBody[relationModel.as] = relationModelValue;
                }
            });
        }


        // var associations = [];
        // if (this.modelDAO.includes) {
        //     this.modelDAO.includes.forEach(value => {
        //         associations.push({ association: this.modelDAO[value.as], as: value.as })
        //     });
        // }
        var associations = this.getIncludes(this.modelDAO);

        console.log(this.modelDAO.build(modelBody, { include: associations }));

        return this.modelDAO.build(modelBody, { include: associations });
        //     LKLangIsoCode: isoCode,
        // localizedDao[`LK${daoName}Id`] = modelId;
    }

    getIncludes(modelDAO) {
        var associations = [];
        if (modelDAO.includes) {
            modelDAO.includes.forEach(value => {
                associations.push({ association: modelDAO[value.as], as: value.as });
                var tmp = this.getIncludes(value.model);
                tmp.forEach(v => {
                    associations.push(v);
                });
            });
        }
        return associations;
    }

    createModel(dao) {

        var model = {};

        model.value = dao.value;

        model.modelId = dao[`LK${daoName}Id`];

        model.isoCode = dao[`LKLangIsoCode`];

        return model;
    }

    createLocalDAO(parentDAOId, model) {
        var value = model.value;

        var LKLangIsoCode = model.LKLangIsoCode;

        const modelLocalDAO = require(`../DAO/${this.daoName}Local`);

        var modelLocal = {
            value: value,
            LKLangIsoCode: LKLangIsoCode,
        };

        modelLocal[`LK${this.daoName}Id`] = parentDAOId;

        var dao = modelLocalDAO.build(modelLocal);


        //if (!parentDAO[`LK_${this.daoName}_Locals`])
        //    parentDAO[`LK_${this.daoName}_Locals`] = [];

        //parentDAO[`LK_${this.daoName}_Locals`].push(dao);

        return dao;
    }

    isPrimaryKey(modelDAO, key) {
        return modelDAO.tableAttributes[key].primaryKey;
    }

    isAllowedKey(key) {
        return this.notAllowedKeies.filter(arrayKey => arrayKey == key).length == 0
    }

}


module.exports = GnericWrapper;
