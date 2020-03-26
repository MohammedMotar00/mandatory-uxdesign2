import React, { Component } from 'react'
import '../css/phone.css';
import HamburgerButton from './HamburgerButton';

class Main extends Component {
  render() {
    return (
      <div class="smartphone">
        <div class="screen">
          <header>
            <HamburgerButton />
            <h1>Quiz Master</h1>
          </header>

          <main>
            <button className="CenterButton">
                Start Quiz
            </button>
          </main>
        </div>
      </div>
    )
  }
}

export default Main
