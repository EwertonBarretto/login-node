const conection = require('../databese');

const models = {
  User: conection.import('./users')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {models, conection };