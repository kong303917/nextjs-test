const { 
  PHASE_DEVELOPMENT_SERVER, 
  PHASE_PRODUCTION_BUILD, 
  PHASE_PRODUCTION_SERVER 
} = require('next/constants');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css')
const configCommon = require('./config/config.common.js');
const configDev = require('./config/config.dev.js');
const configProd = require('./config/config.prod.js');

function withPlugins(config) {
  return withCSS(withSass(
    config
  ));
}

module.exports = (phase, { defaultConfig }) => {
  
  // development
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return withPlugins({
      ...configCommon,
      ...configDev
    })
  }

  // pruduction
  if (
    phase === PHASE_PRODUCTION_BUILD ||
    phase === PHASE_PRODUCTION_SERVER
  ) {
    return withPlugins({
      ...configCommon,
      ...configProd
    })
  }
  
  // 其他
  return withPlugins({
    ...configCommon,
    ...configProd
  })
};