import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { FaTrashAlt, FaCheckCircle, FaCheck } from 'react-icons/fa';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class WorkflowCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: false,
      nodeState: 'P'
    };
  }
  mouseOver = () => {
    this.setState(
      {
        focus: true
      },
      console.log('focus on')
    );
  };
  mouseOut = () => {
    this.setState(
      {
        focus: false
      },
      console.log('focus off')
    );
  };
  updateNodeState = () => {
    if (this.state.nodeState === 'P') {
      this.setState({
        nodeState: 'C'
      });
    } else if (this.state.nodeState === 'C') {
      this.setState({
        nodeState: 'P'
      });
    }
  };
  render() {
    const { name, id, status, deleted } = this.props.workflow;
    return (
      <>
        <Col style={{ border: '1px solid black' }}>
          <Card
            style={{ width: '18rem' }}
            onMouseEnter={this.mouseOver}
            onMouseLeave={this.mouseOut}
          >
            <Card.Body>
              <Card.Text>{name}</Card.Text>
              <Row>
                <Col>
                  <Card.Text>{status}</Card.Text>
                </Col>
                <Col>
                  <Button
                    className='btn-circle btn-sm'
                    variant='primary'
                    onClick={this.updateNodeState}
                  >
                    <FaCheck />
                  </Button>
                </Col>
              </Row>
            </Card.Body>
            {this.state.focus && (
              <Button
                className='overlay-btn btn-circle btn-sm'
                variant='primary'
              >
                <FaTrashAlt />
              </Button>
            )}
          </Card>
        </Col>
      </>
    );
  }
}

export default WorkflowCard;
