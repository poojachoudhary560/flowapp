import React, { Component } from 'react';
import WorkflowBar from './WorkflowBar';
import WorkflowCard from './WorkflowCard';

import Row from 'react-bootstrap/Row';

import Container from 'react-bootstrap/Container';

//import workflowData from '../../api/workflow';
import AppContext from '../../context/AppContext';

class WorkflowList extends Component {
  constructor(props) {
    super(props);

    this.state = {
    //  workflowList: []
      search: ''
    };
  }
  static contextType = AppContext;
  componentDidMount() {
    //this.props.context.getWorkflows();
    console.log(this.context);
    this.context.getWorkflows();
    //console.log(workflowData);
  }

  deleteWorkflow = (e) => {
    console.log(e.target.value + '   ' + e.target.name);
    this.context.deleteWorkflow(e.target.value);
  };

  handleSearchChange = (val) => {
   /* const	{name, value} = e.target;
    this.setState({
      [name]: value
    }) */
    this.context.searchWorkflows(val);


  }

  render() {
    let { workflows } = this.context.state;
    return (
      <>
        <WorkflowBar
        handleSearchChange={this.handleSearchChange}
        />
        <Container>
          <Row>
            {workflows.map((workflow) => {
              return (
                <WorkflowCard
                  key={workflow.id}
                  workflow={workflow}
                  deleteWorkflow={this.deleteWorkflow}
                />
              );
            })}
          </Row>
        </Container>
      </>
    );
  }
}

export default WorkflowList;
