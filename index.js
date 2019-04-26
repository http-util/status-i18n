'use strict'

var language = require('./src/language')

status.BROWSER_LANG = (window.navigator.userLanguage || window.navigator.language || '').toLowerCase()

var codes = (language.getTranslations())[language.getUserLanguage()]
// status code to message map
status.STATUS_CODES = codes
// array of status codes
status.codes = populateStatusesMap(status, codes)

function populateStatusesMap (statuses, codes) {
  var arr = []

  Object.keys(codes).forEach(function forEachCode (code) {
    var message = codes[code]
    var status = Number(code)

    // Populate properties
    statuses[status] = message
    statuses[message] = status
    statuses[message.toLowerCase()] = status

    // Add to array
    arr.push(status)
  })

  return arr
}

function status (code, lang, useBrowserDefaultLang) {
  var codes = (language.getTranslations())[language.getUserLanguage(lang)]
  // status code to message map
  status.STATUS_CODES = codes
  // array of status codes
  status.codes = populateStatusesMap(status, codes)
  if (typeof code === 'number') {
    if (!status[code]) return
  } else {
    throw new TypeError('code must be a number or number')
  }

  // '403'
  var n = parseInt(code, 10)
  if (!isNaN(n)) {
    if (!status[n]) throw new Error('invalid status code: ' + n)
  }

  n = status[code]
  if (!n) throw new Error('invalid status message: "' + code + '"')
  return n
}

module.exports = status
