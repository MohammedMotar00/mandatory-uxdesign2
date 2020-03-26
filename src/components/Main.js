import React, { Component } from 'react'
import '../css/phone.css';

class Main extends Component {
  render() {
    return (
      <div class="smartphone">
        <div class="screen">
          <header>
          <h1>Quiz Master</h1>
            {/* Hamburger */}
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
