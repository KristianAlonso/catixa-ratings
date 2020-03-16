module.exports = function core () {
  function definePropertiesSetterAndGetters (_this) {
    // Define object properties getters and setters
    Object.keys(_this).forEach(prop => {
      let propertyValue = _this[prop];

      // If propertyValue is an object define object properties getters and setters too
      if (typeof propertyValue === 'object') {
        definePropertiesSetterAndGetters(propertyValue); // recursive call for objects
      }

      Object.defineProperty(_this, prop, {
        get: function () {
          return typeof propertyValue === 'function' ? propertyValue.call(_this) : propertyValue;
        },
        set: function (newValue) {
          // If propertyValue is a computed property don't change its value
          if (typeof propertyValue === 'function') { return; }

          propertyValue = newValue;
        }
      });
    });
  };

  definePropertiesSetterAndGetters(this);

  return this;
};
