const { Router } = require('express');
const { userQueries } = require('../queries');
const { models } = require('../models/index');

const router = new Router();

router.get('/', function (req, res) {
  models.User.findAll().then(users => {
    res.send(users);
  })
});

router.get('/:id', async (req, res) => {
  const user = await models.User.findByPk(
     parseInt(req.params.id)
    ).then( users => {
    if (!users)
      res.status(404).send('User not found!');
    else 
      res.send(users); 
      return;
  });
});

router.post('', async (req, res) => { 
  if (!req.body.fullName) {
    res.status(400).send('Pls insert a name!');
    return;
  }
  
  const userNew = await models.User.create(
  {
      fullName: req.body.fullName,
      login: req.body.login,
      cellPhone: req.body.cellPhone,
      identifier: req.body.identifier,
      email: req.body.email,
      password: req.body.password,
  });

    res.status(200).send(userNew);
});

router.put('/:id', async (req, res) => {
  const userNew = await models.User.update({
    fullName: req.body.fullName,
    login: req.body.login,
    cellPhone: req.body.cell,
    identifier: req.body.identifier,
    email: req.body.email,
    password: req.body.password,
  },
  {
    where: {
      id: req.params.id
    }
  }).then( (rows) => {
    console.log(rows[0]);
    if (rows[0] === 0) {
      res.send('User not found!');
    }
    else {
      res.send(`Rows Update:` + rows);
    }
  });
});

router.delete('/:id', async (req, res) => {
  await models.User.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  }).then( (rows) => {
    if (rows === 0) {
      res.send('User not found!');
    }
    else {
      res.send(`Affected rows:` + rows);
    }
  }).catch( (err) => {
    res.send(``+err)
    console.log(err);
  });
});

module.exports = router;