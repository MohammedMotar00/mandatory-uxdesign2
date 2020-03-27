import React, { Component } from 'react'

import axios from 'axios';

import '../css/game.css';

class Game extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      gameStarted: false
    }
  }

  componentDidMount() {
    console.log('hej');

    axios('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(res => console.log(res))
  }

  startGame = () => {
    console.log('start');
    this.setState({ gameStarted: true });
  }

  render() {
    const { gameStarted } = this.state;

    let hideBtn = '';
    if (gameStarted) {
      hideBtn = 'hide-start-btn'
    } else {
      hideBtn = ''
    }

    return (
      <>
        <button className={hideBtn} onClick={this.startGame}>Start Game</button>
      </>
    )
  }
}

export default Game
