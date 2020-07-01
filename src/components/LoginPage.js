import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserContext from '../context/user/UserContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import {
  FaEnvelopeOpen,
  FaEnvelopeSquare,
  FaRegEnvelope,
  FaAsterisk
} from 'react-icons/fa';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      remember: false
    };
  }
  static contextType = UserContext;

  handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  login = (event) => {
    event.preventDefault();
    // alert('submitted');
    // change props here
    if (this.state.email && this.state.password) {
      console.log(this.context);
      this.context.login(this.state);
      //this.props.history.push('/home')
    }
  };
  render() {
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card style={{marginTop: '4rem'}}>
              <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form>
                  <InputGroup className='mb-3'  style={{marginTop: '2rem'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id='basic-addon1'>
                        <FaRegEnvelope />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                      name='email'
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <InputGroup className='mb-3'  style={{marginTop: '2rem'}} >
                    <InputGroup.Prepend>
                      <InputGroup.Text id='basic-addon1'>
                        <FaAsterisk />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      name='password'
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </InputGroup>

                  <Form.Group controlId='formBasicCheckbox'  style={{marginTop: '2rem', textAlign: 'left'}}>
                    <Form.Check type='checkbox' label='Remember me' />
                  </Form.Group>
                  <Button
                  style={{marginTop: '2rem'}}
                    variant='primary'
                    type='submit'
                    onClick={this.login}
                    block
                  >
                    Login
                  </Button>
                </Form>

              </Card.Body>
              <Card.Link href='#' style={{marginTop: '1rem', marginBottom: '2rem'}}>
                Don't have an account? Sign up here
              </Card.Link>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginPage;
