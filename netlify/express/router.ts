const express = require('express');
const db = require('./db.ts');

const router = express.Router();

router.get("/get-artworks",  async (req, res, next) => {
  db.getAllArtworks()
    .then(data => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data, cockroachDbDataSerializer));
    })
    .catch(e => {
      next(e);
    })
});

router.get("/get-contacts",  async (req, res, next) => {
  db.getContacts()
    .then(data => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data, cockroachDbDataSerializer));
    })
    .catch(e => {
      next(e);
    })
});

router.get("/get-classes",  async (req, res, next) => {
  db.getClasses(req.query.lang)
    .then(data => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data, cockroachDbDataSerializer));
    })
    .catch(e => {
      next(e);
    })
});

/* The custom serializer is needed because CockroachDB IDs map
   to JavaScript BigInts, which JSON.stringify has trouble serializing.
*/
const cockroachDbDataSerializer = (_key, value) =>
  typeof value === 'bigint'
    ? value.toString()
    : value;

module.exports = router;