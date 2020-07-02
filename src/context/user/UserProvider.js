import React, { Component } from 'react';
import UserContext from './UserContext';
import { withRouter } from 'react-router-dom';

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'Guest'
      },
      authenticated: false
    };
  }

  loginHandler = () => {
    this.setState(
      {
        authenticated: true,
        user: {
          name: 'pooja'
        }
      },
      () => this.props.history.push('/home')
    );
  };
  logoutHandler = () => {
    this.setState(
      {
        authenticated: false,
        user: {}
      },
      () => this.props.history.push('/')
    );
  };
  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          authenticated: this.state.authenticated,
          login: this.loginHandler,
          logout: this.logoutHandler
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default withRouter(UserProvider);
