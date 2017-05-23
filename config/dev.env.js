var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SIGNIN_REDIRECT: '"http://localhost:8080/signincallback"'
})
