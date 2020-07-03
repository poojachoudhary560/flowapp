import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { FaCheck } from 'react-icons/fa';
import Col from 'react-bootstrap/Col';
import arrow_right from '../../images/arrow_right.png';
import Form from 'react-bootstrap/Form';

class NodeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /*  title: '',
      id: 1,
      content: '',
      status: '',
      variant: 'light' */
    };
  }

  handleChange = (event) => {
    const { id, title, content } = this.props.node;
    this.props.handleNodeChange(event, id);
  };
  showStatus = (status) => {
    let stateClassMap = {
      completed: 'Completed',
      'in-progress': 'Inprogress',
      pending: 'Pending'
    };
    return stateClassMap[status];
  };
  handleClick = (e) => {
    const { id } = this.props.node;
    //let node = e.target.value;

    this.props.handleNodeChange(e, id);

    //update state here
    //return changeStateOrder[val];
  };
  render() {
    // const { name, id, status, deleted } = this.props.workflow;
    const { node, handleChange } = this.props;
    const { id, title, content, status } = node;
    return (
      <>
        <Col xs={12} md={4} className='node-cards-layout'>
          <Row>
            <Col xs={7} md={7}>
              <Card>
                <Card.Body>
                  <Form>
                    <Form.Group controlId='exampleForm.ControlInput2'>
                      <Form.Control
                        type='text'
                        placeholder='name@example.com'
                        value={title}
                        name='title'
                        onChange={this.handleChange}
                      />

                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlTextarea1'>
                      <Form.Control
                        as='textarea'
                        rows='12'
                        name='content'
                        value={content}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>

                <Button
                  className={`overlay-btn-node btn-circle btn-sm `}
                  variant={status}
                  name='status'
                  value={status}
                  onClick={this.handleClick}
                >
                  <FaCheck />
                </Button>
              </Card>
            </Col>
            <Col xs={5} md={5} className='arrow-col'>
              {this.props.showArrow && (
                <img
                  style={{
                    width: '100%',
                    marginTop: 'auto',
                    marginBottom: 'auto'
                  }}
                  src={arrow_right}
                  alt='Right Arrow'
                />
              )}
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default NodeCard;
