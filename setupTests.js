const Adapter = require("enzyme-adapter-react-16");

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };

require("enzyme").configure({ adapter: new Adapter() });
