import React, { Component } from 'react';
import UserContext from './UserContext';

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'Guest'
      },
      authenticated: false,
    };
  }
  loginHandler = () => {
    setTimeout(() => {
      this.setState({
        authenticated: true,
        user: {
          name: 'pooja'
        }
      });
    }, 2000);
  };
  logoutHandler = () => {
    this.setState({
      authenticated: false,
      user: {}
    });
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

export default UserProvider;
