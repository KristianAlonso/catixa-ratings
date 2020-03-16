const Connector = require('../_global/connector');
const UserBuilder = require('./user-builder');

module.exports = function UserDataBase () {
  let _this = this;

  /**
   * Gets an user by its email address
   *
   * @param {string} userEmail
   * @returns { User }
   */
  _this.getByEmail = async function getByEmail(userEmail) {
    const connectorInstance = new Connector(UserBuilder);
    const command = {
      query: 'CALL user_get_by_email(?);',
      values: [userEmail]
    };

    await connectorInstance.on('connected');

    return connectorInstance.read(command);
  }
};
