(function() {

  var sync = Backbone.sync;
  var ajax = Backbone.ajax;
  var history = window.history;
  var pushState = history.pushState;
  var replaceState = history.replaceState;

  QUnit.testStart(function() {
    var env = this.config.current.testEnvironment;

    // We never want to actually call these during tests.
    history.pushState = history.replaceState = function(){};

    // Capture ajax settings for comparison.
    Backbone.ajax = function(settings) {
      env.ajaxSettings = settings;
    };

    // Capture the arguments to Backbone.sync for comparison.
    Backbone.sync = function(method, model, options) {
      env.syncArgs = {
        method: method,
        model: model,
        options: options
      };
      sync.apply(this, arguments);
    };

  });

  QUnit.testDone(function() {
    Backbone.sync = sync;
    Backbone.ajax = ajax;
    history.pushState = pushState;
    history.replaceState = replaceState;
  });

})();
