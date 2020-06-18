import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
class NodeBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col>
          <Form.Group controlId='exampleForm.ControlInput1'>
            <Form.Control type='text' placeholder='Workflow Title' />
          </Form.Group>
        </Col>
        <Col>
          <Button variant='primary'>Shuffle</Button>{' '}
          <Button variant='primary'>Delete</Button>{' '}
          <Button variant='primary'>Add Node</Button>{' '}
          <Button variant='primary'>Save</Button>{' '}
        </Col>
      </Row>
    );
  }
}

export default NodeBar;
