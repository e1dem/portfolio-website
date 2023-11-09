// TODO: try https://github.com/prisma/prisma/discussions/19564
const express = require('express');
const serverless = require('serverless-http');
const artworkRoutes = require('./router.ts');
const db = require('./db.ts');

function errorHandler (err, req, res, next) {
  console.error("Custom error handler: " + err.stack);

  const errStatus = err.statusCode || 500;
  const errMessage = db.isPrismaError ? "Error while loading data from the DB" : err.message;
  res.status(errStatus)
    .json({
      message: errMessage
    });
}

const app = express();

//app.use('/.netlify/functions/server/', artworkRoutes);  // When using w/o redirects in netlify.toml
app.use('/api/', artworkRoutes);
app.use(errorHandler);

module.exports.handler = serverless(app);