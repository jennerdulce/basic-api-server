'use strict';

// for testing
const supertest = require('supertest');
// bring in routes
const server = require('../src/server.js');
const { response } = require('express');
// enables sudo api requests
const request = supertest(server.app);

describe('Server Testing for CLOTHES routes', () => {
  it('should return 404 on a bad route', async () => {
    await request.get('/notarealroute')
      .then(result => {
        expect(result.status).toEqual(404);
      })
  })

  it('should return 404 on a bad method', async () => {
    await request.delete('/clothes')
      .then(result => {
        expect(result.status).toEqual(404);
      })
  })

  it('should verify a record has been created using POST route', async () => {
    // how do you pass in the body to use towrd the createItem handler..
    // sent in through .send(data) with the mockAPI call-> which translates to req.body in the route
    // is used as the object parameter passed into the CRUD action/handler
    // CRUD: Create handler returns the record: {id: #, record: data}
    const data = {
      type: 'shirt',
      color: 'white',
      size: 'medium'
    }
    await request.post('/clothes').send(data)
      .then(result => {
        expect(result.status).toEqual(201);
        // check for and ID created from the POST
        // result.body === record which is : {id: #, record: data}
        expect(result.body.id).toBeDefined();
        expect(result.body.record.color).toEqual('white')

        // compares values from original object passed to object that was newly created and returned
        Object.keys(result.body.record).forEach(key => {
          expect(result.body.record[key]).toEqual(data[key])
        })
      })
  })


  // OBJECT ADDED FROM POST CARRIES OVER TO THE NEXT TEST
  it('should return a list of rescords using GET', async () => {
    await request.get('/clothes')
      .then(result => {
        console.log(result.body)
        expect(result.status).toBe(200);
        // since we use the get route without an id, will retrieve the whole db
        expect(Array.isArray(result.body)).toBeTruthy()
      })
  })

  it('should return a record using GET', async () => {
    await request.get('/clothes/1')
      .then(result => {
        expect(result.status).toBe(200);
        expect(typeof result.body).toEqual('object');
        expect(result.body.id).toEqual(1);
      })
  })

  it('should update a record using PUT', async () => {
    const data = { type: 'shorts', color: 'yellow', size: 'large' };
    await request.put('/clothes/1').send(data)
      .then(result => {
        expect(result.status).toBe(200);
        expect(result.body.id).toEqual(1)
        expect(result.body.record.type).toEqual('shorts')
      })
  })

  it('should destory a record using DELETE', async () => {
    await request.delete('/clothes/1')
      .then(result => {
        expect(result.status).toBe(204);
        expect(result.body.record).toBeFalsy();
      })

    await request.get('/clothes')
      .then(result => {
        expect(result.body.length).toEqual(0);
      })
  })
});



// ======================================================


describe('Server Testing for FOOD routes', () => {
  it('should return 404 on a bad route', async () => {
    await request.get('/notarealroute')
      .then(result => {
        expect(result.status).toEqual(404);
      })
  })

  it('should return 404 on a bad method', async () => {
    await request.delete('/food')
      .then(result => {
        expect(result.status).toEqual(404);
      })
  })

  it('should verify a record has been created using POST route', async () => {
    // how do you pass in the body to use towrd the createItem handler..
    // sent in through .send(data) with the mockAPI call-> which translates to req.body in the route
    // is used as the object parameter passed into the CRUD action/handler
    // CRUD: Create handler returns the record: {id: #, record: data}
    const data = {
      type: 'breakfast',
      food: 'eggs',
      qty: '3'
    }
    await request.post('/food').send(data)
      .then(result => {
        expect(result.status).toEqual(201);
        // check for and ID created from the POST
        // result.body === record which is : {id: #, record: data}
        expect(result.body.id).toBeDefined();
        expect(result.body.record.food).toEqual('eggs')

        // compares values from original object passed to object that was newly created and returned
        Object.keys(result.body.record).forEach(key => {
          expect(result.body.record[key]).toEqual(data[key])
        })
      })
  })


  // OBJECT ADDED FROM POST CARRIES OVER TO THE NEXT TEST
  it('should return a list of rescords using GET', async () => {
    await request.get('/food')
      .then(result => {
        console.log(result.body)
        expect(result.status).toBe(200);
        // since we use the get route without an id, will retrieve the whole db
        expect(Array.isArray(result.body)).toBeTruthy()
      })
  })

  it('should return a record using GET', async () => {
    await request.get('/food/1')
      .then(result => {
        expect(result.status).toBe(200);
        expect(typeof result.body).toEqual('object');
        expect(result.body.id).toEqual(1);
      })
  })

  it('should update a record using PUT', async () => {
    const data = { type: 'dinner', food: 'steak', qty: '1' };
    await request.put('/food/1').send(data)
      .then(result => {
        expect(result.status).toBe(200);
        expect(result.body.id).toEqual(1)
        expect(result.body.record.type).toEqual('dinner')
      })
  })

  it('should destory a record using DELETE', async () => {
    await request.delete('/food/1')
      .then(result => {
        expect(result.status).toBe(204);
        expect(result.body.record).toBeFalsy();
      })

    await request.get('/clothes')
      .then(result => {
        expect(result.body.length).toEqual(0);
      })
  })
});
