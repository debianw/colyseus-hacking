//
import React, { Component } from 'react';
import Game from './Game'

const host = window.document.location.host.replace(/:.*/, '')
const server = window.location.protocol.replace("http", "ws") + host + (window.location.port ? ':8000' : '');
// const server = `ws://dev-rt.gambit.com/example`

//
class App extends Component {
  state = {
    gameId: 'backgammon-01' 
  }

  render() {
    const { gameId } = this.state

    return (
      <div className="App">
        <Game 
          gameId={gameId}
          server={server}
        />
      </div>
    );
  }
}

//
export default App;
