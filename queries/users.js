const { models } = require('../models/index');

const createUserDefault = async (params) => {
    await models.User.create(
        {
            fullName: 'Admin Full',
            login: 'admin',
            cellPhone: '+55943335',
            identifier: '55477aSD121',
            email: 'teste@teste.com',
            password: '123456',
        }
    );
};

const createNewUser = async (params) => {
    const result = await models.User.create(
    {
        fullName: params.fullName,
        login: params.login,
        cellPhone: params.cell,
        identifier: params.identifier,
        email: params.email,
        password: params.password,
    });

    return result;
};

const findAll = async () => {
    await models.User.findAll().then(users => {
        return users;
    });
};

module.exports = {
    createUserDefault,
    createNewUser,
    findAll
};