//
const express = require('express')
const colyseus = require('colyseus')
const os = require('os')
const cluster = require('cluster')
const { createServer } = require('http')
const GameRoom = require('./rooms/game')

const app = express()
const port = process.env.PORT || 8000

app.use(express.static(`${__dirname}/./static`))

app.get('/health-check', (req, res) => {
  res.json({
    ok: true,
    worker: cluster.worker.id,
  })
})

const gameServer = new colyseus.Server({
  // pingTimeout: 0,
  server: createServer(app),
  // presence: new colyseus.MemsharedPresence(),
})

gameServer.register('game', GameRoom)

gameServer.listen(port)
console.log(`Worker Game service listening on port ${port}`)

// if (cluster.isMaster) {
//   // BEGIN ------------------------------------ MASTER ----------------------------------
//   console.log('Starting master game service')
//   console.log('Node version: ', process.version)

//   const cpus = os.cpus()
//   cpus.forEach(cpu => {
//     cluster.fork()
//   })
//   // ENDS ------------------------------------ MASTER ----------------------------------
// } else {
//   // BEGIN ------------------------------------ WORKER ----------------------------------
//   app.get('/', (req, res) => {
//     res.json({
//       ok: true,
//       worker: cluster.worker.id,
//     })
//   })

//   const gameServer = new colyseus.Server({
//     server: createServer(app),
//     presence: new colyseus.MemsharedPresence(),
//   })

//   gameServer.register('game', GameRoom)

//   gameServer.listen(port)
//   console.log(`Worker Game service listening on port ${port}`)
//   // ENDS ------------------------------------ WORKER ----------------------------------
// }

