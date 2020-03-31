import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';

class ModalDialogBtn extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      show: false
    }
  }

  handleModal = () => {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleModal}>Open Modal</Button>
        <Modal show={this.state.show} onHide={this.handleModal} backdrop="static">
          <Modal.Header closeButton>Modal Head</Modal.Header>
          <Modal.Body>
            hej modal
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModal}>
              close modal
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default ModalDialogBtn
