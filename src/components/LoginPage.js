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
      isChecked: false,
      validated: false
    };
  }
  static contextType = UserContext;

  componentDidMount() {
    console.log(this.context.authenticated);
   if(this.context.authenticated) {
      this.props.history.push('/home')
    }
    if (localStorage.checkbox && localStorage.email !== '') {
      this.setState({
        isChecked: true,
        email: localStorage.username,
        password: localStorage.password
      });
    }
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  setValidated = () => {
    this.setState({
      validated: !this.state.validated
    });
  };
  handleClick = (event) => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  checkValid = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // this will set the validation feedbacks in forms
    this.setState({
      validated: true
    });
    if (form.checkValidity() === true) {
      this.login();
    }
  };

  login = () => {
    const { email, password, isChecked } = this.state;

    if (isChecked && email !== '') {
      localStorage.username = email;
      localStorage.password = password;
      localStorage.checkbox = isChecked;
    }
    if (this.state.email && this.state.password) {
      this.context.login(this.state);
    }
  };
  render() {
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card style={{ marginTop: '4rem' }}>
              <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form
                  noValidate
                  validated={this.state.validated}
                  onSubmit={this.checkValid}
                >
                  <InputGroup className='mb-3' style={{ marginTop: '2rem' }}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id='basic-addon1'>
                        <FaRegEnvelope />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type='email'
                      required
                      placeholder='Enter email'
                      name='email'
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <Form.Control.Feedback type='invalid'>
                      Enter a valid registered email.
                    </Form.Control.Feedback>
                  </InputGroup>
                  <InputGroup className='mb-3' style={{ marginTop: '2rem' }}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id='basic-addon1'>
                        <FaAsterisk />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type='password'
                      required
                      placeholder='Password'
                      name='password'
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <Form.Control.Feedback type='invalid'>
                      This field is required
                    </Form.Control.Feedback>
                  </InputGroup>

                  <Form.Group
                    controlId='formBasicCheckbox'
                    style={{ marginTop: '2rem', textAlign: 'left' }}
                  >
                    <Form.Check
                      type='checkbox'
                      label='Remember me'
                      checked={this.state.isChecked}
                      onChange={this.handleClick}
                    />
                  </Form.Group>
                  <Button
                    style={{ marginTop: '2rem' }}
                    variant='primary'
                    type='submit'
                    block
                  >
                    Login
                  </Button>
                </Form>
              </Card.Body>
              <Card.Link
                href='#'
                style={{ marginTop: '1rem', marginBottom: '2rem' }}
              >
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
