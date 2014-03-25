

function AdBlockerDetector () {
  var self = this;

  // Declare list of callbacks
  self.if_ready       = [];
  self.if_detected    = [];
  self.if_undetected  = [];

  self.results = {};
  self.results.classNameTest = null;

  // 
  self.tests = {};
  // Test whether certain common advertisement class names are being filtered
  self.tests.classNameTest = function () {
    var uniqueId = 'AdBlockDetector-' + Math.floor(Math.random() * 1000);
    var adDiv = document.createElement('div');
    adDiv.className = 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links';
    adDiv.style.position  = 'fixed';
    adDiv.style.color     = 'transparent';
    adDiv.style.left      = '-1000px';
    adDiv.style.right     = '-1000px';
    adDiv.id = uniqueId;
    adDiv.innerHTML = 'x_x';
    document.body.appendChild(adDiv);
    var result = document.getElementById(uniqueId);
    setTimeout(function () {
      self.results.classNameTest = isBlocked(result);
      checkResults();
    }, 1000);
  };
  // Test whether we are blocking content from a shady URL
  self.tests.evilUrlTest = function () {
    self.results.evilUrlTest = false;
  };

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
    self.ready();
    self.tests.classNameTest();
  });
  /**
   * Whether an Element has been Blocked
   */
  function isBlocked (el) {
    var elStyle = window.getComputedStyle(el, null);
    if (
        el.offsetParent   === null      ||
        el['visibility']  === 'hidden'  ||
        el['display']     === 'none'
       )
    {
      return true;
    }

    return false;
  }
  /**
   *
   *
   */
  function checkResults () {
    var all_defined = true;
    var any_failed = false;
    for (key in self.results) {
      var testResult = self.results[key];
      if (testResult === true) {
        self.if_detected[0].call(undefined, key);
        return;
      }
      else if (testResult === false) {
        any_failed = true;
      }
      else {
        all_defined = false;
      }
    }

    if (all_defined && any_failed) {
      self.if_undetected[0].call(undefined, '', {});
    }
  }
}

/**
 *
 */
AdBlockerDetector.prototype.ready = function (callback) {
  if (typeof callback === 'function')
    this.if_ready.push(callback);
  else if (callback === undefined) {
    for (var i=0; i < this.if_ready.length; i++) {
      this.if_ready[i].call(undefined);
    }
  }
  else
    throw new Error('callback is not a function');
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
