import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import { FaFilter, FaPlus, FaSearch } from 'react-icons/fa';
import AppContext from '../../context/AppContext';

class WorkflowBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      filter: 'all'
    };
  }
  componentDidMount() {
    let { searchKey, filter } = this.context.state;
    this.setState({
      search: searchKey,
      filter
    });
  }
  handleChange = (e) => {
    const { name, value } = e.target;

    this.props.handleSearchChange(value);
  };

  handleClick = (eventKey) => {
    this.setState({
      filter: eventKey
    });
    this.context.filterWorkflows(eventKey);
  };
  getActiveStatus = (val) => {
    let active = this.state.filter === val ? true : false;
    return active;
  };
  static contextType = AppContext;

  render() {
    let { searchKey } = this.context.state;
    return (
      <>
        <Container fluid>
          <Row className='node-bar'>
            <Col>
              <Row>
                <Col md={1}></Col>
                <Col xs={12} md={9}>
                  <InputGroup className='mb-3'>
                    <InputGroup.Prepend>
                      <InputGroup.Text id='basic-addon1'>
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type='text'
                      placeholder='Search Workflows'
                      value={searchKey}
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                </Col>
                <Col xs={12} md={2}>
                  <Dropdown className='filter'>
                    <Dropdown.Toggle
                      variant='outline-dark'
                      id='dropdown-basic'
                      block
                    >
                      <FaFilter /> Filter
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onSelect={this.handleClick}
                        active={this.getActiveStatus('all')}
                        eventKey='all'
                      >
                        All
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={this.handleClick}
                        active={this.getActiveStatus('completed')}
                        eventKey='completed'
                      >
                        Completed
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={this.handleClick}
                        active={this.getActiveStatus('pending')}
                        eventKey='pending'
                      >
                        Pending
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <Link to='/add' style={{ marginRight: '50px' }}>
                <Button variant='success'>
                  <FaPlus /> Create Workflow
                </Button>{' '}
              </Link>
            </Col>
          </Row>
          <hr className='line-details' />
        </Container>
      </>
    );
  }
}

export default WorkflowBar;
