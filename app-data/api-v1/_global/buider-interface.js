const ErrorAsJson = require('../../../app-utils/errors/error-as-json');

// IBuilder interace
module.exports = {
  checkFields: function checkFields() {
    throw new ErrorAsJson('Unimplemented interface method readIndexes()', this.constructor.name)
  },
  build: function build() {
    throw new ErrorAsJson('Unimplemented interface method build()', this.constructor.name)
  }
};
