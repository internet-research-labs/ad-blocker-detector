

function AdBlockerDetector () {
  var self = this;

  this.if_detected    = [];
  this.if_undetected  = [];

  /**
   * Ready
   */
  var ready = (function () {
    var f = function (callback) {
      document.addEventListener('DOMContentLoaded', callback, false);
    };
    return f;
  }());

  ready(function () {
    if (self.discovered()) {
      for (var i=0; i < self.if_detected.length; i++) {
        self.if_detected[i].call(undefined);
      }
    }
    else {
      for (var i=0; i < self.if_undetected.length; i++) {
        self.if_undetected[i].call(undefined);
      }
    }
  });
}

/**
 *
 *
 */
AdBlockerDetector.prototype.discovered = function () {
  return false;
};

/**
 * Attach a Callback to Fire If an Ad Blocker Exists
 *
 * @param {function} callback a function
 */
AdBlockerDetector.prototype.yes = function (callback) {
  if (typeof callback === 'function')
    this.if_detected.push(callback);
  else
    throw new Error('callback is not a function');
};

/**
 *
 */
AdBlockerDetector.prototype.no = function (callback) {
  if (typeof callback === 'function')
    this.if_undetected.push(callback);
  else
    throw new Error('callback is not a function');
};

/**
 *
 */
AdBlockerDetector.prototype.on = function (triggerName, callback) {
};

/**
 *
 */
AdBlockerDetector.prototype.on = function (triggerName, callback) {
};

/**
 * Which Version Are We Running
 *
 */
AdBlockerDetector.prototype.version = function () {
};
