var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LASTFM_SIGNIN_CB: '"http://localhost:8080/lastfmsignincb"'
})
