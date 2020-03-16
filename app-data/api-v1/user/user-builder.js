const User = require('./user-model');
const buiderInterface = require('../_global/buider-interface');
const ErrorAsJson = require('../../../app-utils/errors/error-as-json');

module.exports = function UserBuilder(dataRecord, customKeyFieldPairs = {}) {
  const _this = this;
  let keyFieldPairs = {
    id: 'id',
    userFirstName: 'user_first_name',
    userSecondName: 'user_second_name',
    userFirstLastName: 'user_first_last_name',
    userSecondLastName: 'user_second_last_name'
  };

  // If the current query has different fields
  if (customKeyFieldPairs && Object.keys(customKeyFieldPairs).length) {
    var field = '';

    keyFieldPairs = customKeyFieldPairs; // Set Key-Field pairs form external Key-Field pairs object
  }

  // Check if result set contains all required fields
  for (let key in keyFieldPairs) {
    if(!dataRecord.fields.includes(keyFieldPairs[key])) {
      throw new ErrorAsJson('Field "' + keyFieldPairs[key] + '" not found in database result set', __filename);
    }
  }

  /**
   * Builds a new User instance from database result set
   */
  _this.build = function build(rowIndex = 0) {
    user = new User();

    // If result set has no records
    if (!dataRecord.rows || !dataRecord.rows.length) {
      return null;
    }

    // Set user props from result set fields
    for (const key in keyFieldPairs) {
      user[key] = dataRecord.rows[rowIndex];
    }

    return user;
  }

  for (const key in buiderInterface) {
    if (_this.hasOwnProperty(key)) {
      _this[key]();
    }
    else
    {
      throw ErrorAsJson(_this.constructor.name + ' Does not implements IBuilder interface');
    }
  }
}