import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaPlus, FaTimes, FaRandom } from 'react-icons/fa';
//import AppContext from '../../context/AppContext';
class NodeBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isInValid: false
    };
  }

  //static contextType = AppContext;
  handleChange(event) {
    this.props.handleNameChange(event);
  }
  checkValid = (event) => {
    if (this.props.workspaceName) {
      this.props.handleClick(event);
    } else {
      this.setState({
        isInValid: true
      });
    }

  };
  render() {
    const { workspaceName } = this.props;
    return (
      <>
        <Row className='node-bar'>
          <Col>
            <Row>
              <Col md={9}>
                <Form.Group controlId='exampleForm.ControlInput1'>
                  <Form.Control
                    name='workflowName'
                    type='text'
                    placeholder={
                      this.state.isInValid
                        ? 'Workflow Title is required'
                        : 'Workflow Title'
                    }
                    onChange={this.handleChange}
                    value={workspaceName}
                  />
                  {this.state.isInValid && (
                    <Form.Control.Feedback>
                      Enter a valid registered email.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col md={3}>
                {this.state.isInValid && (
                  <p style={{ color: 'red', textAlign: 'left' }}>*Required</p>
                )}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col></Col>
              <Col>
                <Button
                  variant='purple'
                  block
                  onClick={this.props.handleClick}
                  name='shuffle'
                >
                  {' '}
                  <FaRandom /> Shuffle
                </Button>{' '}
              </Col>
              <Col>
                <Button
                  variant='danger'
                  block
                  onClick={this.props.handleClick}
                  name='delete'
                >
                  {' '}
                  <FaTimes /> Delete
                </Button>{' '}
              </Col>
              <Col>
                <Button
                  block
                  variant='success'
                  name='add'
                  onClick={this.props.handleClick}
                >
                  {' '}
                  <FaPlus /> Add Node
                </Button>{' '}
              </Col>
              <Col>
                <Button
                  block
                  variant='primary'
                  name='save'
                  onClick={this.checkValid}
                >
                  Save
                </Button>{' '}
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

export default NodeBar;
