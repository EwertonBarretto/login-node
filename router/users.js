const { Router } = require('express');
const { userQueries } = require('../queries');
const { models } = require('../models/index');

const router = new Router();

router.get('/', function (req, res) {
    res.send(users);
});

router.get('/:id', function (req, res) {
  const user = users.find(c => c.id === parseInt(req.params.id));

  if (!user)
    res.status(404).send('User not found!');
  else 
    res.send(user); 
});

router.post('', (req, res) => {
  if (!req.body.username) {
    res.status(400).send('Pls insert a name!');
    return;
  }
  
  userQueries.createNewUser(req.body).then(() => {
    console.log('to aqui');
    
    models.User.findAll().then(users => {
      res.send(users);
      console.log("All users:", JSON.stringify(users, null, 4));
    });
  });;

  //const user = await models.User.findAll();
  // models.User.findAll().then(users => {
  //   console.log("All users:", JSON.stringify(users, null, 4));
  // });

  //console.log(user);
  //console.log(users);

 //res.send(users);  
});

router.put('/:id', (req, res) => {
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user){
    res.status(404).send('User not found!');
    return;
  }
  else if (!req.body.name) {
    res.status(400).send('Pls insert a name!');
    return;
  } 
  user.name = req.body.name;
  res.send(users);
});

router.delete('/:id', (req, res) => {
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user){
    res.status(404).send('User not found!');
    retunr
  }

  users.splice(users.indexOf(user), 1);
  res.send(users);
});

const users = [];

module.exports = router;