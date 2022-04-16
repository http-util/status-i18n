'use strict'

import locales from './locales/index.js'
import config from './config.js'

const defaultLanguage = config.defaultLanguage

export function getUserLanguage (lang) {
  if (typeof lang === 'string') {
    lang = lang.toLowerCase()

    for (const configLanguage of config.languages) {
      if ([configLanguage, configLanguage.split('-')[0]].includes(lang)) {
        return configLanguage
      }
    }
  }

  return config.defaultLanguage
}

const $translations = {}

export function getTranslations () {
  if (Object.keys($translations).length) {
    return $translations
  }

  const translations = $translations
  const languages = config.languages

  for (const language of languages) {
    if (Object.keys(locales).includes(language)) {
      translations[language] = locales[language]
    } else {
      translations[language] = locales[defaultLanguage]
    }
  }

  const defaultTranslations = translations[defaultLanguage]

  for (const defaultTranslation in defaultTranslations) {
    for (const language of languages) {
      translations[language] = translations[language] || {}
      translations[language][defaultTranslation] = translations[language][defaultTranslation] || defaultTranslations[defaultTranslation]
    }
  }

  return translations
}
