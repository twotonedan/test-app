const { SupportedLocales, SupportedLocalesArray } = require('./src/constants/locales/supportedLocales');
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: SupportedLocales.EN,
    locales: SupportedLocalesArray,
    localePath: path.resolve('./public/locales'),
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
