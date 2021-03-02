'use strict';

// 3rd party Dependencies
const express = require('express');

// internal modules
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const clothesRoutes = require('./routes/clothes.js');
const foodRoutes = require('./routes/food.js');

// use dependency
const app = express();
app.use(express.json());

app.use(clothesRoutes);
app.use(foodRoutes);

// routes
app.use('*', notFoundHandler);
app.use(errorHandler);

// export server
module.exports = {
  app: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Now listening on port: ${port}`);
    });
  }
};
