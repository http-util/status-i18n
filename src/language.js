'use strict'
import { createRequire } from 'module'

import config from './config.json'

const require = createRequire(import.meta.url)

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
    try {
      translations[language] = require(`./locales/${language}.json`)
    } catch (e) {
      translations[language] = require(`./locales/${defaultLanguage}.json`)
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
