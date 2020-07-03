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
    this.setState({
      focus: true
    });
  };
  mouseOut = () => {
    this.setState({
      focus: false
    });
  };
  updateNodeState = () => {
    const { name, id, status, deleted, nodes } = this.props.workflow;
    if (status === 'pending') {
      let flag = 0;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].status !== 'completed') {
          break;
        }
        flag += 1;
      }
      if (flag < nodes.length) {
        // cannot mark complete
        this.props.notify();
      } else {
        // mark status complete and save
        const newData = { ...this.props.workflow };
        newData.status = 'completed';
        this.props.updateWorkflowStatus(newData);
      }
    } else if (status === 'completed') {
      const newData = { ...this.props.workflow };
      newData.status = 'pending';
      this.props.updateWorkflowStatus(newData);
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
        <Col xs={6} md={4} className='node-cards-layout'>
          <Card
            style={{
              width: '18rem',
              boxShadow: this.state.focus ? '1px 0px 1px #9E9E9E' : ''
            }}
            onMouseEnter={this.mouseOver}
            onMouseLeave={this.mouseOut}
          >
            <Card.Body>
              <Card.Text>
                <Link to={`/edit/${id}`}>
                  <Button
                    block
                    variant='outline-dark'
                    onClick={this.editWorkflow}
                  >
                    {name}
                  </Button>
                </Link>
              </Card.Text>

              <Row>
                <Col>
                  <Card.Text>{status.toUpperCase()}</Card.Text>
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
