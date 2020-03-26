import React, { Component } from 'react'

import '../css/hamburger-button.css';

class HamburgerButton extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      activeStats: false,
      activeAbout: false
    }
  }

  clickedOnStats = () => {
    this.setState({ activeStats: true });
  }

  clickedOnAbout = () => {
    this.setState({ activeAbout: true });
  }

  render() {
    const { activeStats, activeAbout } = this.state;



    return (
      <>
        <nav role="navigation" id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <li>Home</li>
            <li onClick={this.clickedOnStats}>Stats</li>
            <li>Info</li>
          </ul>
        </nav>
      </>
    )
  }
}

export default HamburgerButton
