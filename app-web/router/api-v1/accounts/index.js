var UserDataBase = require('../../../../app-data/api-v1/user/user-database');
var express = require('express');
var router = express();
var childRouter = express();

router.use('/accounts', childRouter);

childRouter.post('/login', function login (request, response, next) {
  const user = new UserDataBase();

  console.info('router > accounts > index.js', '\n user =', user);

  user.getByEmail(request.body.userEmail)
  .then(result => {
    console.info('router > accounts > index.js > user.getByEmail(...).then(...)',
      '\n result =', result);
    response.status(200).json({ result, requestBody: request.body });
  }).catch(error => {
    console.error('router > accounts > index.js > user.getByEmail(...).then(...)',
      '\n error =', error);
    response.status(500).json(error);
  });
});

childRouter.get('/recover/:userEmail', function recover (request, response, next) {
  userEmail = request.params.userEmail.trim();

  response.status(200).json({
    userEmail
  });
});

module.exports = router;