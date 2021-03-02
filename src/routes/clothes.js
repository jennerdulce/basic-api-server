'use strict';

const express = require('express');
// importing class
const Clothes = require('../models/clothes.js');
// creating 'clothes' database
const clothes = new Clothes();

// Resource Driven Routing
// gives this custom ability to use: .get(), post() etc.
// app.get() -> router.get()
const clothesRoute = express.Router();

// actual routes
// note that some endpoints may be the same but methods are different. routes with the send endpoint but different method are separate entities.
clothesRoute.get('/clothes', getItems);
clothesRoute.get('/clothes/:id', getItem);
clothesRoute.post('/clothes', createItem);
clothesRoute.put('/clothes/:id', updateItem);
clothesRoute.delete('/clothes/:id', deleteItem);

// handler
function getItems(req, res){
  let all = clothes.read();
  res.status(200).json(all);
}

function getItem(req, res){
  let id = parseInt(req.params.id);
  let item = clothes.read(id);
  res.status(200).json(item);
}

function createItem(req, res){
  let obj = req.body;
  let newItem = clothes.create(obj);
  res.status(201).json(newItem);
}

function updateItem(req, res) {
  let id = parseInt(req.params.id);
  let content = req.body;
  let updated = clothes.update(id, content);
  res.status(200).send(updated);
}

function deleteItem(req, res) {
  let id = parseInt(req.params.id);
  let deleted = clothes.delete(id);
  res.status(204).json(deleted);
}

// export route
module.exports = clothesRoute;

