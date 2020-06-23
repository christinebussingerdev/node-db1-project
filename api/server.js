const express = require('express')

// import routers
const accountRouter = require('../routers/accountRouter')

// init server
const server = express();
server.use(express.json())

// routing
server.use('/accounts', accountRouter)

server.use((err, req, res, next) => {
  console.log(`something went wrong: ${err}`)
  res.status(500).json({error: "Something went wrong"})
})

server.get('/', (req, res) => {
  res.send('interact with accounts at /accounts')
})

module.exports = server