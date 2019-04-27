'use strict';

var language = require('./src/language');

status.BROWSER_LANG = typeof window !== 'undefined' &&
  (window.navigator.userLanguage || window.navigator.language || '').toLowerCase();

var codes = language.getTranslations()[language.getUserLanguage()];

// status code to message map
status.STATUS_CODES = codes;

// array of status codes
status.codes = populateStatusesMap(status, codes);

function populateStatusesMap(statuses, codes) {
  var arr = [];
  Object.keys(codes).forEach(function forEachCode(code) {
    var message = codes[code];
    var status = Number(code);
    // Populate properties
    statuses[status] = message;
    statuses[message] = status;
    statuses[message.toLowerCase()] = status;
    // Add to array
    arr.push(status);
  });
  return arr;
}

function status(code, lang) {
  var codes = language.getTranslations()[language.getUserLanguage(lang)];
  // status code to message map
  status.STATUS_CODES = codes;
  // array of status codes
  status.codes = populateStatusesMap(status, codes);

  if (typeof code === 'number') {
    if (!status[code]) return;
  } else {
    return;
  }

  return status[code];
}

module.exports = status;
