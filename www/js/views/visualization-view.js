define(['visualization'], function(visualization) {
  var exports = {};

  exports.render = function(el) {
    visualization.draw(el);
  };

  return exports;
});