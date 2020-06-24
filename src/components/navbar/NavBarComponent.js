import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
class NavBarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar bg='light'>
          <Navbar.Brand>
          <Link to="/">
            Brawwnd link
            </Link>
            </Navbar.Brand>

        </Navbar>
      </>
    );
  }
}

export default NavBarComponent;
