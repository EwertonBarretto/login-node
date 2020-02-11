const conection = require('../database');

const models = {
  User: conection.import('./user'),
  Pet: conection.import('./pet')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {models, conection };