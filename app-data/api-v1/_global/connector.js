const mysql2 = require('mysql2/promise');
const ErrorAsJson = require('../../../app-utils/errors/error-as-json');

module.exports = async function Connector (EntityBuilder, command = '') {
  let _this = this;
  let regiteredEvents = {};

  _this.connection = null;
  _this.command = command;

  _this.$emit = function $emit (eventName) {
    if (!regiteredEvents[eventName]) { return false; }

    regiteredEvents[eventName].forEach(callback => {
      callback.apply(_this, Array.from(arguments).slice(1));
    });

    return true;
  }
  _this.on = function on(eventName, callback = function f() {}) {
    if (!regiteredEvents[eventName]) {
      regiteredEvents[eventName] = [];
    }

    return new Promise((resolve, reject) => {
      callbackCopy = callback;

      callback = function promiseResolver() {
        let result = callbackCopy.apply(_this, arguments);

        if (result)
        {
          resolve(result);
        }
        else
        {
          resolve();
        }
      }

      regiteredEvents[eventName].push(callback)
    });
  }
  _this.executeNonQuery = async function executeNonQuery (command = '') {
    if (command) {
      _this.command = command;
    }

    try {
      let result = null;

      if (!_this.command) {
        throw new Error('Unable to run query "command" is empty');
      }

      await connection.connect();

      result = await connection.query(_this.command.query, _this.command.values);
      // const [rows, fields] = await connection.execute(_this.command.query, _this.command.values);

      connection.end();

      return result;
    } catch (error) {
      console.error(error);
    }
  }
  _this.read = async function read (command = '', keyFieldPairs = {}) {
    if (command) {
      _this.command = command;
    }

    try {
      let builder = null;
      let entityObject = null;

      if (!_this.command) {
        throw new Error('Unable to run query "command" is empty');
      }

      await connection.connect();

      const [rows, fields] = await connection.query(_this.command.query, _this.command.values);
      // const [rows, fields] = await connection.execute(_this.command.query, _this.command.values);

      builder       = new EntityBuilder({ rows, fields }, keyFieldPairs);
      entityObject  = builder.build();

      connection.end();

      return entityObject;
    } catch (error) {
      console.error(error);
    }
  }
  _this.readList = async function readList (command = '', keyFieldPairs = {}) {
    if (command) {
      _this.command = command;
    }

    try {
      let builder = null;
      let entityObject = null;
      let entityList = [];

      if (!_this.command) {
        throw new Error('Unable to run query "command" is empty');
      }

      await connection.connect();

      const [rows, fields] = await connection.query(_this.command.query, _this.command.values);
      // const [rows, fields] = await connection.execute(_this.command.query, _this.command.values);

      builder = new EntityBuilder({ rows, fields }, keyFieldPairs);

      for (const rowIndex in rows) {
        entityObject  = builder.build();

        if(entityObject) {
          entityList.push(entityObject);
        }
      }

      connection.end();

      return entityList;
    } catch (error) {
      console.error(error);
    }
  }

  mysql2.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'catixa'
  }).then(conn => {
    _this.connection = conn;
    _this.$emit('connected', _this.connection);
  }).catch(error => {
    throw ErrorAsJson(error.message, __filename);
  });
}