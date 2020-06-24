import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import AppContext from '../../context/AppContext';
class NodeBar extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }
  compoenentDidMount() {
    console.log(this.props);
  }
  //static contextType = AppContext;
  handleChange(event) {

    this.props.handleNameChange(event);
  }
  render() {
    const { workspaceName } = this.props;
    return (
      <>
      <Row>
        <Col>

            <Form.Group controlId='exampleForm.ControlInput1'>
            <Form.Control name="workflowName" type='text'
            placeholder='Workflow Title'
            onChange={this.handleChange}
            value={workspaceName}
            />
          </Form.Group>

        </Col>
        <Col>
          <Button variant='primary'>Shuffle</Button>{' '}
          <Button variant='primary'>Delete</Button>{' '}
          <Button variant='primary'
          name="add"
          onClick={this.props.handleClick}
          >Add Node</Button>{' '}
          <Button variant='primary'
          name="save"
          onClick={this.props.handleClick}>Save</Button>{' '}
        </Col>

      </Row>
      </>
    );
  }
}

export default NodeBar;
