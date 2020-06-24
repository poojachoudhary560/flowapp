import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { FaTrashAlt, FaCheckCircle, FaCheck } from 'react-icons/fa';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

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
    const { name, id, status, deleted, nodes } = this.props.workflow;
    let flag = 0;
    for(let i=0; i<nodes.length; i++) {

      if(nodes[i].status !== 'completed') {
        break;
      }
      flag += 1;
    }
    if(flag < nodes.length) {
      // cannot mark complete
      console.log("cannot mark complete");
    } else {
      // mark status complete and save
      console.log("mark status complete");
    }
  };
  editWorkflow() {}

  deleteWorkflow = (e) => {
    this.props.deleteWorkflow(e);
  };
  render() {
    const { name, id, status, deleted } = this.props.workflow;
    return (
      <>
        <Col xs={6} md={4} style={{ border: '1px solid black' }}>
          <Card
            style={{ width: '18rem' }}
            onMouseEnter={this.mouseOver}
            onMouseLeave={this.mouseOut}
          >
            <Card.Body>
              <Card.Text>
                <Link to={`/edit/${id}`}>
                  <Button variant='primary' onClick={this.editWorkflow}>
                    {name}
                  </Button>
                </Link>
              </Card.Text>

              <Row>
                <Col>
                  <Card.Text>{status}</Card.Text>
                </Col>
                <Col>
                  <Button
                    variant={status}
                    className={`btn-circle btn-sm `}
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
                style={{ background: 'red' }}
                name='delete'
                value={id}
                onClick={this.deleteWorkflow}
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
