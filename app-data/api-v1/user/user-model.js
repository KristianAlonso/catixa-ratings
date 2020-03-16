const coreObject = require('../../../app-utils/core-object');

module.exports = function User() {
  this.id = '';
  this.userFirstName = '';
  this.userSecondName = '';
  this.userLastName = '';
  this.userSecondLastName = '';
  this.userFullName = () =>
    `${this.userFirstName} ${this.userSecondName} ${this.userLastName} ${this.userSecondLastName}`.trim();
  this.userEmail = '';
  this.userRecoveryEmails = [];
  this.userCountry = '';
  this.userPhone = '';
  this.userNickname = '';
  this.userAvatar = '';
  this.userPhoto = '';
  this.userLoginHistory = [];
  this.userLoginDevices = [];

  coreObject.call(this); // Inherit core object for enabling reactivity
};