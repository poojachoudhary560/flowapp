import React, { Component } from 'react';
import WorkflowBar from './WorkflowBar';
import WorkflowCard from './WorkflowCard';
import { ToastContainer, toast } from 'react-toastify';
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
    console.log(this.props);
    console.log(this.context);
    this.context.getWorkflows();
    //console.log(workflowData);
  }
  notify = () =>
    toast('🦄 Wow so easy!', {
      position: 'bottom-center',
      type: 'dark',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

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
  };

  updateWorkflowStatus = (data) => {
    this.context.updateWorkflowState(data);
  };

  render() {
    let { workflows } = this.context.state;
    return (
      <>
        <WorkflowBar handleSearchChange={this.handleSearchChange} />
        <Container>
          <Row>
            {workflows.map((workflow) => {
              return (
                <WorkflowCard
                  key={workflow.id}
                  workflow={workflow}
                  deleteWorkflow={this.deleteWorkflow}
                  updateWorkflowStatus={this.updateWorkflowStatus}
                  notify={this.notify}
                />
              );
            })}
          </Row>
        </Container>
        <ToastContainer />
        {/* Same as */}
      </>
    );
  }
}

export default WorkflowList;
