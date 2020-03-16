var UserDataBase = require('../../../../app-data/api-v1/user/user-database');

module.exports = {
  /**
   * POST /accounts/login
   *
   * @param { Request } request
   * @param { Response } response
   * @param { Function } next
   */
  login: async function login (request, response, next) {
    try {
      const user = new UserDataBase();
      let result = null;

      console.info('controllers > accounts > index.js', '\n user =', user);

      result = await user.getByEmail(request.body.userEmail);
      response.status(200).json(result);
    } catch (error) {
      response.status(500).json(error);
    }
  },
  /**
   * GET /accounts/recovery/:userEmail
   *
   * @param { Request } request
   * @param { Response } response
   * @param { Function } next
   */
  recover: function recover (request, response, next) {
    try {
      userEmail = request.params.userEmail.trim();

      response.status(200).json({
        userEmail
      });
    } catch (error) {
      response.status(500).json(error);
    }
  }
};