import React, { Component } from 'react'

import '../css/hamburger-button.css';

class HamburgerButton extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      activeStats: false,
      activeAbout: false,

      checked: false
    }
  }

  unCheck = () => {
    this.setState({ checked: false });
    this.setState({ activeAbout: false });
    this.setState({ activeStats: false });
  }

  handleChange(e) {
    if(this.state.checked !== e.target.checked) {
      this.setState({ checked: e.target.checked });
    }
    this.setState({ activeAbout: false });
    this.setState({ activeStats: false });
  }

  clickedOnStats = () => {
    this.setState({ activeStats: true });
    this.setState({ activeAbout: false });
  }

  clickedOnAbout = () => {
    this.setState({ activeAbout: true });
    this.setState({ activeStats: false });
  }

  closeBtn = () => {
    this.setState({ activeAbout: false });
    this.setState({ activeStats: false });
  }

  render() {
    const { activeStats, activeAbout } = this.state;

    let showAbout = '';
    if (activeAbout) {
      showAbout = 'clickedAbout';
    } else {
      showAbout = 'notClicked';
    }

    let showStats = '';
    if (activeStats) {
      showStats = 'clickedStats';
    } else {
      showStats = 'notClicked';
    }

    let gamesPlayed = JSON.parse(localStorage.getItem("gamesPlayed"));
    let highScore = JSON.parse(localStorage.getItem("highscore")); // kanske ändrar senare variabeln i localStorage till correctScore!

    let incorrectAnswers = gamesPlayed * 10 - highScore;


    return (
      <>
        <nav role="navigation" id="menuToggle">
          <input type="checkbox" checked={this.state.checked} onChange={this.handleChange.bind(this)} />
          <span></span>
          <span></span>
          <span></span>
          <ul className="menu">
            <li onClick={this.unCheck}>Close </li>
            <li onClick={this.clickedOnStats}>Stats</li>
            <li onClick={this.clickedOnAbout}>About</li>
          </ul>
        </nav>

        <div className={showAbout}>
          <button onClick={this.closeBtn}>X</button>
          <p>My game, created 2020 and its the best!</p>
        </div>

          <div className={showStats}>
            <button onClick={this.closeBtn}>X</button>
            <p>Game played = {gamesPlayed}</p>
            <br/>
            <p>Correct answer = {highScore}</p>
            <br/>
            <p>Incorrect answer = {incorrectAnswers}</p>
            <br/>
            <p>Correct presentage = 30%</p>
          </div>
      </>
    )
  }
}

export default HamburgerButton
