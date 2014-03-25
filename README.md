# Ad Blocker Detector

Non-clever ad blocker detection. Gives a full report on what types of ads are
not showing up.

## Install

`bower install ad-blocker-detector`

## Usage

3 event handlers:

```Javascript
var adBlockerDetector = new AdBlockerDetector();

// Triggers when ready to run tests
adBlockerDetector.ready(function () {
  console.log('Running tests');
});

// Triggers when an ad blocker is detected
adBlockerDetector.yes(function (which_test, report) {
  var div = document.getElementById('adBlockerStatus');
  console.log('AdBlocker Detected');
});

// Triggers when an ad blocker is not found and all the tests have finished running
adBlockerDetector.no(function (which_test, report) {
  console.log('AdBlocker Not Detected');
});
```

# UNLICENSE

Do not license cute ideas.
