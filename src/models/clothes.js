'use strict';

class Clothes {
  constructor() {
    this.id = 0;
    this.db = [];
  }

  // REST: POST -> CRUD: CREATE
  create(object) {
    let record = {
      id: ++this.id,
      record: object
    };
    // push entry into database
    this.db.push(record);
    console.log('========== Successfully added: ===========');
    console.log(record);
    return record;
  }

  // REST: GET -> CRUD: READ
  read(id) {
    if (id) {
      return this.db.find(record => record.id === id);
    } else {
      return this.db;
    }
  }

  // REST: PUT -> CRUD: UPDATE
  update(id, obj) {
    if (id) {
      this.db = this.db.map(file => {
        if (file.id === id) {
          file.record = obj;
          return file;
        }
      });
      return this.db.find(record => record.id === id);
    }
  }

  // REST: DELETE -> CRUD: DELETE
  delete(id) {
    if (id) {
      console.log(`deleting ID: ${id}`);
      this.db = this.db.filter(record => record.id !== id);
      return this.db.find(record => record.id === id);
    }
    return undefined;
  }

}

module.exports = Clothes;
