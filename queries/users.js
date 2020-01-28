const { models } = require('../models/index');

const createUserDefault = async (params) => {
    await models.User.create(
        {
            username: 'jjbaerao',
            fullName: 'joao barao',
            cellPhone: '2312321'
        }
    );

    await models.User.create(
        {
            username: 'ddavids1',
            fullName: 'david souza11',
            cellPhone: '222'
        }
    );
};

const createNewUser = async (params) => {
    await models.User.create(
        {
            username: params.username,
            fullName: params.fullName,
            cellPhone: params.username
        }
    );
};

const findAll = async () => {
    return await models.User.findAll();
};

module.exports = {
    createUserDefault,
    createNewUser,
    findAll
};