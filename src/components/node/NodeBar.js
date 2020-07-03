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

  }

  //static contextType = AppContext;
  handleChange(event) {
    this.props.handleNameChange(event);
  }

  render() {
    const { workspaceName, workspaceStatus } = this.props;
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
                      this.props.isWorkflowNameInvalid
                        ? 'Workflow Title is required'
                        : 'Workflow Title'
                    }
                    onChange={this.handleChange}
                    value={workspaceName}
                  />

                </Form.Group>
              </Col>
              <Col md={3}>
                {this.props.isWorkflowNameInvalid && (
                  <p style={{ color: 'red', textAlign: 'left' }}>*Required</p>
                )}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col></Col>
              <Col>
                {
                  workspaceStatus === 'completed' && <Button
                  variant='purple'
                  block
                  onClick={this.props.handleClick}
                  name='shuffle'
                >
                  {' '}
                  <FaRandom /> Shuffle
                </Button>
                }{' '}
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
                  onClick={this.props.handleClick}
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
