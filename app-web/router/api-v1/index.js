var accountsRoutes = require('./accounts');
var express = require('express');
var router = express();

// Middleware or request interceptor
router.use((request, response, next) => {
  console.info(`${request.method}: ${request.url}`);
  // response.setHeader('Content-Security-Policy', 'default-src \'none\'');
  response.header('Content-Security-Policy', 'default-src \'self\'; report-url *');
  next();
});

router.use(accountsRoutes);

router.route('/')
.post((request, response, next) => {
    response.status(200).json(request.body);
})
.get((request, response, next) => {
    response.status(200).json(request.body);
});

module.exports = router;