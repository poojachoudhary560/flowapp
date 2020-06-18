import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';

class NavBarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar bg='light'>
          <Navbar.Brand href='#home'>Brawwnd link</Navbar.Brand>
        </Navbar>
      </>
    );
  }
}

export default NavBarComponent;
