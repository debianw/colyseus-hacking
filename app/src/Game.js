//
import React, { Component } from 'react'
import * as Colyseus from 'colyseus.js'

//
class Game extends Component {
  state = {
    started: false,
    showRejoin: false,
    messages: [],
    session: null,
    message: '',
    isOnline: false
  }

  message = React.createRef()

  /**
   * 
   */

  componentDidMount() {
    this.createClient()
  }

  /**
   * 
   */

  createClient = () => {
    this.client = new Colyseus.Client(this.props.server) 

    this.client.onOpen.add(() => {
      console.log('connection is now open!')

      this.setState({
        showRejoin: this.state.started,
        isOnline: true
      })
    })

    this.client.onClose.add(() => {
      this.setState({ isOnline: false })
      console.log('connection has been closed!')
    })
    this.client.onError.add((err) => console.log('something wrong happened', err))
  }

  /**
   * 
   */

  start = () => {
    const { gameId } = this.props

    if (this.room) {
      console.log('Rejoining!!!')
      this.room = this.client.rejoin('game', this.state.sessionId)
    } else {
      this.room = this.client.join('game', { gameId })
    }

    this.room.onJoin.add(() => {
      console.log('client joined!')
      this.setState({ started: true, showRejoin: false, session: this.room.sessionId })
    })

    this.room.onStateChange.add(({ messages }) => {
      this.setState({ messages })
    })

    this.room.onLeave.add(() => {
      console.log('client left the room')
    })

    this.room.onError.add(function(err) {
      console.log("oops, error ocurred:");
      console.log(err);
    });
  }

  send = () => {
    if (!this.message.current.value) return
    this.room.send(this.message.current.value)
    this.setState({ message: '' })
  }

  /**
   * 
   */

  render() {
    const { started, messages, showRejoin, isOnline, message } = this.state

    return (
      <div>
        <h1> Chat Game </h1>
        <b>I am {isOnline ? 'online' : 'offline'}</b>

        { isOnline && started && (
          <div>
            <input placeholder="Send a Message" ref={this.message} onChange={(e) => this.setState({ message: e.target.value })} value={message} /> <button onClick={this.send}>SEND</button>
            <div>
              <h4>Messages</h4>
              {messages.map(msg => (
                <div key={msg.id}>{msg.message}</div>
              ))}
            </div>
          </div>
        )}

        <div>
          { !started && <button onClick={this.start}>START GAME</button> }
          { showRejoin && <button onClick={this.start}>PLEASE REJOIN</button>}
        </div>
      </div>
    )
  }
}

//
export default Game