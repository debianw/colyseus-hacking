//
const { Room } = require('colyseus')
// const cluster = require('cluster')
const uuid = require('uuid/v4')

//
class Game extends Room {

  // When room is initialied
  onInit(options) {
    console.log('Game room init, ', options)
    this.setState({ messages: [] })
  }

  // Checks if a new client is allowed to join
  requestJoin(options, isNew) {
    // console.log('requestJoin: ', options, ' isNew: ', isNew, ' worker: ', cluster.worker.id)
    console.log('requestJoin: ', options, ' isNew: ', isNew)
    return true
  }

  // When client successfully join the room
  onJoin(client, options, auth) {
    console.log(`Client ${client.id} joined!`)
    this.sendMessage(`Player ${client.id} joined`)
  }

  // When a client sends a message
  onMessage(client, message) {
    // console.log(`Client ${client.id} sends: `, message, ' in worker: ', cluster.worker.id)
    console.log(`Client ${client.id} sends: `, message)
    this.sendMessage(message)
  }

  sendMessage(message) {
    this.state.messages.push({ id: uuid(), message })
  }

  // When a client leaves the room
  async onLeave(client, consented) {
    console.log('IS CONSENTED ? ', consented, ' clientId: ', client.id, ' sessionId: ', client.sessionId)

    try {
      if (consented) throw new Error('just close!')

      await this.allowReconnection(client, 120);
      console.log('CLIENT RECONNECTED: ', client.id, ' sessionId: ', client.sessionId)
    } catch(err) {
      console.log(err)
      this.sendMessage(`${client.id} left.`)
      console.log('ChatRoom: ', client.id, ' left!')
    }
  }

  // Cleanup callback, called after there are no more clients in the room
  onDispose() {
    console.log('No more clients in the room')
  }

}

//
module.exports = Game