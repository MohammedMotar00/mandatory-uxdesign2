import React, { Component } from 'react'
import '../css/phone.css';
import HamburgerButton from './HamburgerButton';
import Game from './Game';

class Main extends Component {
  render() {
    return (
      <div className="smartphone">
        <div className="screen">
          <header>
            <HamburgerButton />
            <h1 tabIndex="0" aria-label="Quiz Master">Quiz Master</h1>
          </header>

          <main>
            <Game />
          </main>
        </div>
      </div>
    )
  }
}

export default Main
