import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      remember: false
    };
  }
  handleChange = (event) => {
    console.log(event.target);
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  login = (event) => {
    event.preventDefault();
    alert('submitted');
 // change props here
   if(this.state.email && this.state.password) {
     this.props.loggedStatus('in');
   }
  }
  render() {
    return (
      <Form>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email'
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password'
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Remember me'
           />
        </Form.Group>
        <Button variant='primary' type='submit' onClick={this.login}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginPage;
