import React, { Component } from 'react'

import '../css/hamburger-button.css';

class HamburgerButton extends Component {
  render() {
    return (
      <>
        <nav role="navigation" id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <a href="#"><li>Home</li></a>
            <a href="#"><li>About</li></a>
            <a href="#"><li>Info</li></a>
            <a href="#"><li>Contact</li></a>
          </ul>
        </nav>
      </>
    )
  }
}

export default HamburgerButton
