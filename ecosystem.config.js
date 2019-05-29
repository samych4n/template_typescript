const path = require('path')

module.exports = {
  apps: [{
    name: 'app',
    script: 'Javascript/index.js', 
    instances: 1,
    autorestart: true,
    max_memory_restart: '1G'
  }]
}