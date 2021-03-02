'use strict';

const express = require('express');
// importing class
const Food = require('../models/food.js');
// creating 'food' database
const food = new Food();

// Resource Driven Routing
// gives this custom ability to use: .get(), post() etc.
// app.get() -> router.get()
const foodRoute = express.Router();

// actual routes
// note that some endpoints may be the same but methods are different. routes with the send endpoint but different method are separate entities.
foodRoute.get('/food', getItems);
foodRoute.get('/food/:id', getItem);
foodRoute.post('/food', createItem);
foodRoute.put('/food/:id', updateItem);
foodRoute.delete('/food/:id', deleteItem);

// handler
function getItems(req, res){
  let all = food.read();
  res.status(200).json(all);
}

function getItem(req, res){
  let id = parseInt(req.params.id);
  let item = food.read(id);
  res.status(200).json(item);
}

function createItem(req, res){
  let obj = req.body;
  let newItem = food.create(obj);
  res.status(201).json(newItem);
}

function updateItem(req, res) {
  let id = parseInt(req.params.id);
  let content = req.body;
  let updated = food.update(id, content);
  res.status(200).send(updated);
}

function deleteItem(req, res) {
  let id = parseInt(req.params.id);
  let deleted = food.delete(id);
  res.status(204).send('Item successfully deleted..');
}

// export route
module.exports = foodRoute;

