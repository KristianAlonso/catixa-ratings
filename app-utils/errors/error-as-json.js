module.exports = function ErrorAsJson(message, stackTrace) {
  let _this = this;

  _this.message = message;
  _this.stackTrace = stackTrace;
}