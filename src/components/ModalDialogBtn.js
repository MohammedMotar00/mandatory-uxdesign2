import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';

class ModalDialogBtn extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    console.log(this.props.show)
    // this.setState({ show: true });
  }

  componentDidUpdate() {
    console.log(this.props.show)
    let show = this.props.show;

    this.setState({ show: show });
  }

  componentWillUnmount() {
    this.setState({ show: false });
  }

  handleModal = () => {
    this.setState({ show: false });

    console.log(this.props.showStats)
  }

  render() {
    return (
      <div>
        {/* <Button onClick={this.handleModal}>Open Modal</Button> */}
        <Modal show={this.state.show} onHide={this.handleModal} backdrop="static">
          <Modal.Header closeButton>Modal Head</Modal.Header>
          <Modal.Body>
            hej modal
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={!this.props.show}>
              close modal
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default ModalDialogBtn
