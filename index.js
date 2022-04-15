'use strict'

import { getTranslations, getUserLanguage } from './src/language.js'

status.BROWSER_LANG = typeof window !== 'undefined' &&
  (window.navigator.userLanguage || window.navigator.language || '').toLowerCase()

const codes = getTranslations()[getUserLanguage()]

// array of status codes
status.codes = populateStatusesMap(status, codes)

function populateStatusesMap (statuses, codes) {
  const arr = []

  for (const code in codes) {
    const message = codes[code]
    const status = Number(code)
    // Populate properties
    statuses[status] = message
    statuses[message] = status
    statuses[message.toLowerCase()] = status
    // Add to array
    arr.push(status)
  }

  return arr
}

export function status (code, lang) {
  const codes = getTranslations()[getUserLanguage(lang)]
  // array of status codes
  const statuses = {}

  populateStatusesMap(statuses, codes)

  if (typeof code === 'number') {
    if (!statuses[code]) return
  } else {
    return
  }

  return statuses[code]
}

export default status
