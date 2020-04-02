import React, { Component } from 'react'

import { Button, Modal } from 'react-bootstrap';

class Stats extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      show: false
    }
  }

  handleModal = () => {
    this.setState({ show: !this.state.show });
    this.props.handleFocus();
  }

  render() {
    const { show } = this.state;

    let gamesPlayed = JSON.parse(localStorage.getItem("gamesPlayed"));
    let highScore = JSON.parse(localStorage.getItem("highscore")); // kanske ändrar senare variabeln i localStorage till correctScore!

    let incorrectAnswers = gamesPlayed * 10 - highScore;

    return (
      <>
      <Button aria-label="Stats button" onClick={this.handleModal}>Stats</Button>
      <Modal show={show} onHide={this.handleModal} backdrop="static">
        <Modal.Header closeButton><h2 tabIndex="0">Stats</h2></Modal.Header>
        <Modal.Body style={{ margin: '0 auto' }} >
          <h3 tabIndex="0´1">Games played: <strong>{gamesPlayed}</strong></h3>
          <h3 tabIndex="0">Your score is: <strong>{highScore}</strong></h3>
          <h3 tabIndex="0">Incorrect answers: <strong>{incorrectAnswers}</strong></h3>
        </Modal.Body>
      </Modal>
      </>
    )
  }
}

export default Stats
