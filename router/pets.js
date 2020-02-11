const { Router } = require('express');
const { models } = require('../models/index');

const router = new Router();

router.get('/', (req, res) => {
  models.Pet.findAll().then(pets => {
    res.send(pets);
  })
});

router.get('/:id', async (req, res) => {
  const Pet = await models.Pet.findByPk(
      parseInt(req.params.id)
    ).then( pets => {
    if (!pets)
      res.status(404).send('Pet not found!');
    else 
      res.send(pets); 
      return;
    });
});

router.post('', async (req, res) => { 
  if (!req.body.name) {
    res.status(400).send('Pls insert a name!');
    return;
  }
  
  if (!req.body.userId) {
    res.status(400).send('Pls insert a user id!');
    return;
  } 
  
  models.User.findByPk(parseInt(req.body.userId)).then(async user => {
    if (!user) {
      res.status(400).send('User not found!');
      return;
    }

    const PetNew = await models.Pet.create(
    {
      name: req.body.name,
      description: req.body.description,
      breed: req.body.breed,
      userId: req.body.userId
    }).then((info) => {
      res.status(200).send(info);
      return;
    }).catch((err) => {
      res.status(400).send(err);
      return;
    });
  });
});

router.put('/:id', async (req, res) => {
  const PetNew = await models.Pet.update({
    name: req.body.name,
    description: req.body.description,
    breed: req.body.breed,
    userId: req.body.userId
  },
  {
    where: {
      id: req.params.id
    }
  }).then( (rows) => {
    console.log(rows[0]);
    if (rows[0] === 0) {
      res.send('Pet not found!');
    }
    else {
      res.send(`Rows Update:` + rows);
    }
  }).catch((err) => {
    res.status(400).send(err);
    return;
  });;
});

router.delete('/:id', async (req, res) => {
  await models.Pet.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  }).then( (rows) => {
    if (rows === 0) {
      res.send('Pet not found!');
    }
    else {
      res.send(`Affected rows:` + rows);
    }
  }).catch( (err) => {
    res.send(err)
    console.log(err);
  });
});

module.exports = router;