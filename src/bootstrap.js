/* eslint no-console:0 */
var app = require('./app')
var helpers = require('./helpers')

// this is only relevant when using `hot` mode with webpack
const reloading = document.readyState === 'complete'
if (module.hot) {
  module.hot.accept(function(err) {
    console.log('❌  HMR Error:', err)
  })
  if (reloading) {
    console.log('🔁  HMR Reloading.')
    app.onLoad()
  } else {
    console.info('✅  HMR Enabled.')
    bootstrap()
  }
} else {
  console.info('❌  HMR Not Supported.')
  bootstrap()
}

function bootstrap() {
  helpers.$on(window, 'load', app.onLoad)
  helpers.$on(window, 'hashchange', app.onLoad)
}