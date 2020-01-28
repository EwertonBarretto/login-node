require('dotenv').config();
const express = require('express');
const routersApp = require('./router');
const {models, conection } = require('./models');
const app = express();

const port = process.env.PORT || 3000;  

app.use(express.json());

app.get('/', getCoisa);

function getCoisa (req, res) {
  res.send('Hello World!!');
}

app.use('/api', routersApp);

const eraseDatabaseOnSync = false;

conection.sync({ force: eraseDatabaseOnSync }).then(async () => {
    console.log('chegou aqui');
    if (eraseDatabaseOnSync) {
        createUsersWithMessages();
    }
  
    app.listen({ port: port }, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  });


  const createUsersWithMessages = async () => {
    await models.User.create(
      {
        username: 'rwieruch'
      }
    );
  
    await models.User.create(
      {
        username: 'ddavids'
      }
    );
  };

  
// app.listen(port, function () {
//   console.log(`Example app listening on port ${port}!`);
// });