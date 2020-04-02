import React, { Component } from 'react'

import FocusTrap from 'focus-trap-react';

import '../css/hamburger-button.css';

import About from './About';
import Stats from './Stats';

class HamburgerButton extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      activeStats: false,
      activeAbout: false,

      checked: false,
      focus: false
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
      this.setState({ focus: e.target.checked });
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

  handleFocus = () => {
    this.setState({ focus: !this.state.focus });
  }

  render() {
    const { focus, checked } = this.state;

    return (
      <>
        <FocusTrap active={focus}>
        <nav role="navigation" id="menuToggle">
            <input type="checkbox" checked={checked} onChange={this.handleChange.bind(this)} />
            <span onClick></span>
            <span></span>
            <span></span>
            <ul className="menu">
              <li onClick={this.unCheck}>Close </li>
              <li><Stats handleFocus={this.handleFocus} /></li>
              <li><About handleFocus={this.handleFocus} /></li>
            </ul>
        </nav>
        </FocusTrap>
      </>
    )
  }
}

export default HamburgerButton
