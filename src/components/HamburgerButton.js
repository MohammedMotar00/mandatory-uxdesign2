import React, { Component } from 'react'

import '../css/hamburger-button.css';

import { Button, Modal } from 'react-bootstrap'
import About from './About';
import Stats from './Stats';

class HamburgerButton extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      activeStats: false,
      activeAbout: false,

      checked: false,
      show: false
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

  handleModal = () => {
    this.setState({ show: !this.state.show });
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

    return (
      <>
        <nav role="navigation" id="menuToggle">
          <input type="checkbox" checked={this.state.checked} onChange={this.handleChange.bind(this)} />
          <span onClick></span>
          <span></span>
          <span></span>
          <ul className="menu">
            <li onClick={this.unCheck}>Close </li>
            <li><Stats /></li>
            <li><About /></li>
          </ul>
        </nav>
      </>
    )
  }
}

export default HamburgerButton
