import React, { Component } from 'react';
import AppContext from './AppContext';
import workflowData from '../api/workflow';

class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initial: 'abc',
      workflows: [],
      hello: '',
      workflow: {
        name: 'tes',
        id: 1,
        nodes: [
          {
            name: '',
            description: '',
            id: 1
          }
        ]
      }
    };
  }

  getWorkflows = () => {
    console.log('here -------');
    console.log(workflowData);

    this.setState(
      {
        workflows: workflowData,
        hello: 'ahah'
      },
      console.log(this.state)
    );
  };
  getWorkflow(id) {
    //console.log(this.props);
    console.log(this.state.workflows);
    let val = this.state.workflows.find((item) => {
      return item.id === id;
    });
    console.log(val);

    return val;
  }
  setWorkflow(name, value) {
    this.setState({
      ...this.state,
      workflow: {}
    });
  }
  setWorkflowName = (e) => {
    console.log(this.state.workflow);
    let newWorkflow = { ...this.state.workflow };
    newWorkflow.name = e.target.value;
    this.setState({
      workflow: newWorkflow
    });
  };
  setNodeDetails = (e) => {
    // let id = this.state.node.length > 0 ? this.state.node.length : 1;
    let newWorkflow = { ...this.state.workflow };

    this.setState({});
  };

  saveWorkflow = (data) => {
    let workflows = [];
    // save after edit and add
    console.log(this.props)
    if (this.props.location.pathname.contains('/edit')) {
      let position;
      let newArray = this.state.workflows.filter((element, index) => {
        //filter 'em elements
        if (data.id === element.id) {
          position = index;
        }
        return data.id === element.id
      });
      console.log(position)
      console.log(newArray);
    } else if (this.props.location.pathname.contains('/add')) {
      workflows = [...this.state.workflows, data];
      workflowData.push(data);
      console.log(workflows);
    }
    console.log(data);

    this.setState({
      workflows
    });
  };

  deleteWorkflow = (id) => {
    console.log(typeof id);
    var newArr = this.state.workflows.filter((item) => {
      console.log(typeof item.id);
      return item.id !== parseInt(id);
    });
    console.log(newArr);
    this.setState({
      workflows: newArr
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          getWorkflows: this.getWorkflows,
          getWorkflow: this.getWorkflow,
          setWorkflowName: this.setWorkflowName,
          saveWorkflow: this.saveWorkflow,
          deleteWorkflow: this.deleteWorkflow
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
