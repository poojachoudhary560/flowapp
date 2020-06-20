import React, { Component } from 'react';
import WorkflowBar from './WorkflowBar';
import WorkflowCard from './WorkflowCard';

import Row from 'react-bootstrap/Row';

import Container from 'react-bootstrap/Container';

import workflowData from '../../api/workflow';

class WorkflowList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workflowList: []
    };
  }
  componentDidMount() {
    console.log(workflowData);
    this.setState({
      workflowList: workflowData
    });
  }

  render() {
    return (
      <>
        <WorkflowBar />
        <Container>
          <Row>

              {this.state.workflowList.map((workflow) => {
                return <WorkflowCard key={workflow.id} workflow={workflow}/>;
              })}

          </Row>
        </Container>
      </>
    );
  }
}

export default WorkflowList;
