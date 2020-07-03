import React, { Component } from 'react';
import AppContext from './AppContext';
import { withRouter } from 'react-router-dom';
import workflowData from '../api/workflow';
import axios from 'axios';
class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initial: 'abc',
      workflows: [],
      workflowsOriginal: [],
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
      },
      searchKey: '',
      filter: 'all'
    };
  }

  getWorkflows = () => {
    axios.get('http://localhost:3001/workflows').then((res) => {
      if (this.state.searchKey === '' && this.state.filter === 'all') {
        this.setState({
          workflows: res.data,
          workflowsOriginal: res.data
        });
      } else {
        this.setState(
          {
            workflowsOriginal: res.data
          },

          () => this.searchFilterWorkflow()
        );
      }
    });
  };
  getWorkflow(id) {
    let val;
    axios.get(`http://localhost:3001/workflows/${id}`).then((res) => {
      this.setState({
        workflow: res.data
      });
    });

    //return val;
  }
  setWorkflow(name, value) {
    this.setState({
      ...this.state,
      workflow: {}
    });
  }
  setWorkflowName = (e) => {
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

  saveWorkflow = (nodeData, mode) => {
    let data = {...nodeData, nodesTitleInvalid: false}
    const headers = {
      'Content-Type': 'application/json'
      //'Authorization': 'JWT fefege...'
    };
    let workflows = [];
    // save after edit and add
    if (mode === 'edit') {
      let position;
      let newArray = this.state.workflows.filter((element, index) => {
        //filter 'em elements
        if (data.id === element.id) {
          position = index;
        }
        return data.id === element.id;
      });

      axios
        .put(`http://localhost:3001/workflows/${data.id}`, data, {
          headers: headers
        })
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            workflows = [...this.state.workflows];
            workflows[position] = data;
            this.setState(
              {
                workflows,
                workflowsOriginal: workflows
              },
              () => this.props.history.goBack()
            );
          }
        });
    } else if (mode === 'add') {
      axios
        .post('http://localhost:3001/workflows', data, {
          headers: headers
        })
        .then((response) => {
          if (response.status === 201) {
            workflows = [...this.state.workflows, response.data];

            this.setState(
              {
                workflows,
                workflowsOriginal: workflows
              },
              () => this.props.history.goBack()
            );
          }
        });
    }
  };
  updateWorkflowState = (data) => {
    const headers = {
      'Content-Type': 'application/json'
      //'Authorization': 'JWT fefege...'
    };
    axios
      .put(`http://localhost:3001/workflows/${data.id}`, data, {
        headers: headers
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          this.getWorkflows();
        }
      });
  };
  searchWorkflows = (val) => {
    this.setState({
      // workflows: newWorkflows,
      searchKey: val
    });
  };

  filterWorkflows = (filter) => {
    this.setState({
      //workflows: newWorkflows,
      filter
    });
  };

  searchFilterWorkflow = () => {
    let afterFilter;
    let afterSearch;
    if (this.state.filter === 'all') {
      afterFilter = [...this.state.workflowsOriginal];
    } else {
      afterFilter = this.state.workflowsOriginal.filter((item) => {
        return item.status === this.state.filter;
      });
    }

    if (this.state.searchKey === '') {
      afterSearch = [...afterFilter];
    } else {
      afterSearch = afterFilter.filter((item) => {
        return item.name.toLowerCase().includes(this.state.searchKey);
      });
    }

    this.setState({
      workflows: afterSearch
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.filter !== prevState.filter ||
      this.state.searchKey !== prevState.searchKey
    ) {
      // this.filterWorkflows(this.state.filter);
      this.searchFilterWorkflow();
    }
  }
  deleteWorkflow = (id) => {
    axios.delete(`http://localhost:3001/workflows/${id}`).then((res) => {
      if (res.status === 200) {
        this.getWorkflows();
      }
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
          deleteWorkflow: this.deleteWorkflow,
          searchWorkflows: this.searchWorkflows,
          filterWorkflows: this.filterWorkflows,
          updateWorkflowState: this.updateWorkflowState
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default withRouter(AppProvider);
