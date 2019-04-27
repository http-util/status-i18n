"use strict";

var config = require('./config.json');

var defaultLanguage = config.defaultLanguage;

function getUserLanguage(lang) {
  if (typeof lang === 'string') {
    lang = lang.toLowerCase()
    if (config.languages.includes(lang)) {
      return lang
    }
  }
  return config.defaultLanguage;
}

var $translations = {};

function getTranslations() {
  if (Object.keys($translations).length) {
    return $translations;
  }

  var translations = $translations;
  var languages = config.languages;

  languages.forEach(function (lang) {
    try {
      translations[lang] = require("./locales/".concat(lang, ".json"));
    } catch (e) {
      translations[lang] = require("./locales/".concat(defaultLanguage, ".json"));
    }
  });

  var defaultTranslations = translations[defaultLanguage];

  Object.keys(defaultTranslations).forEach(function (key) {
    languages.forEach(function (lang) {
      translations[lang] = translations[lang] || {};
      translations[lang][key] = translations[lang][key] || defaultTranslations[key];
    });
  });
  return translations;
}

;
module.exports = {
  getUserLanguage: getUserLanguage,
  getTranslations: getTranslations
};
