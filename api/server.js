const express = require('express')

// import routers
const accountRouter = require('../routers/accountRouter')

// init server
const server = express();
server.use(express.json())

// routing
server.use('/accounts', accountRouter)

server.get('/', (req, res) => {
  res.send('interact with accounts at /accounts')
})

module.exports = server