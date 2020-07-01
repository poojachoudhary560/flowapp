import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import UserContext from '../../context/user/UserContext';
class NavBarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    console.log(this.props);
    console.log(this.context);
  }
  componentDidUpdate() {
    console.log(this.context);
  }
  handleChange = () => {
    this.context.logout();
    console.log(this.props);
  };
  static contextType = UserContext;
  render() {
    return (
      <>
        <Navbar className='nav-bar-properties'>
          <Navbar.Brand className='home-nav'>
            {this.context.authenticated ? (
              <Link to='/home' className='home-link'>
                FLOWAPP
              </Link>
            ) : (
              <Link to='/' className='home-link'>
                FLOWAPP
              </Link>
            )}
          </Navbar.Brand>
          {this.context.authenticated && (
            <Link to='/' className='home-link' style={{ marginLeft: 'auto' }}>
              <Button variant='light' onClick={this.handleChange}>
                Logout
              </Button>{' '}
            </Link>
          )}
        </Navbar>
      </>
    );
  }
}

export default NavBarComponent;
