import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class WorkflowBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <Form.Group controlId='exampleForm.ControlInput1'>
                <Form.Control type='text' placeholder='Search Workflows' />
              </Form.Group>
              <Form.Group controlId='exampleForm.SelectCustom'>
                <Form.Label>Custom select</Form.Label>
                <Form.Control as='select' custom>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Button variant='primary'>Create Workflow</Button>{' '}
            </Col>
          </Row>
        </Container>
        <hr/>
      </>
    );
  }
}

export default WorkflowBar;
