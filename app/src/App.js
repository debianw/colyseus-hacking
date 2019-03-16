//
import React, { Component } from 'react';
import Game from './Game'

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
          server="ws://192.168.0.16:8000"
        />
      </div>
    );
  }
}

//
export default App;
