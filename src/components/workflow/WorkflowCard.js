import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class WorkflowCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
        focus: false
    };
  }
  mouseOver = () => {
    this.setState({
      focus:true
    }, console.log('focus on'));
  }
  mouseOut = () => {
    this.setState({
      focus:false
    }, console.log('focus off'));
  }
  render() {
    return (
      <>
      <Container>
        <Row>
          <Col style={{border: '1px solid black'}}>
            <Card style={{ width: '18rem' }}
            onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}
            >
              <Card.Body>
                <Card.Text>Workflow name</Card.Text>
                <Card.Text>COMPLETED</Card.Text>
              </Card.Body>
              {this.state.focus && <Button className="overlay-btn" variant='primary'>
              Go somewhere
            </Button>}
            </Card>


          </Col>
          <Col style={{border: '1px solid black'}}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Text>Workflow name</Card.Text>
                <Card.Text>COMPLETED</Card.Text>
              </Card.Body>
            </Card>

            <Button variant='primary'>
              Go somewhere
            </Button>
          </Col>
          <Col style={{border: '1px solid black'}}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Text>Workflow name</Card.Text>
                <Card.Text>COMPLETED</Card.Text>
              </Card.Body>
            </Card>

            <Button variant='primary'>
              Go somewhere
            </Button>
          </Col>
        </Row>
        </Container>
      </>
    );
  }
}

export default WorkflowCard;
