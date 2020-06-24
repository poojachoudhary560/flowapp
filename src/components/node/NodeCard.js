import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { FaTrashAlt, FaCheck } from 'react-icons/fa';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

class NodeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      id: 1,
      content: "",
      status: "",
      variant: 'light'
    };
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleChange = (event) => {
    const {id, title, content} = this.props.node;
    this.props.handleNodeChange(event, id);
  }
  showStatus = (status) => {
    let stateClassMap = {
      'completed': 'Completed',
      'in-progress': 'Inprogress',
      'pending': 'Pending'
    }
    return stateClassMap[status];
  }
  handleClick = (e) => {
    const {id} = this.props.node;
    //let node = e.target.value;

    this.props.handleNodeChange(e, id);

    //update state here
    //return changeStateOrder[val];
  }
  render() {
    // const { name, id, status, deleted } = this.props.workflow;
    const {node, handleChange} = this.props;
    const {id, title, content, status} = node;
    return (
      <>

        <Col style={{ border: '1px solid black' }}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
            {title} {content} {status}
              <Form>
                <Form.Group controlId='exampleForm.ControlInput2'>
                  <Form.Control type='text' placeholder='name@example.com'
                  value={title}
                  name="title"
                  onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId='exampleForm.ControlTextarea1'>
                  <Form.Control as='textarea' rows='3'
                  name="content"
                  value={content}
                  onChange={this.handleChange}
                  />
                </Form.Group>
              </Form>
              <Button className={`btn-circle btn-sm `}
                    name="status"
                    value={status}
                    variant="flat"
                    onClick={this.changeColor}
            >
              <FaCheck />
            </Button>
            </Card.Body>

            <Button className={`overlay-btn btn-circle btn-sm `}
            variant={status}
                    name="status"
                    value={status}
                    onClick={this.handleClick}
            >
              <FaCheck />
            </Button>
          </Card>
        </Col>
      </>
    );
  }
}

export default NodeCard;
