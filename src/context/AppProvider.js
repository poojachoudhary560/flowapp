import React, { Component } from 'react';
import AppContext from './AppContext';
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
    console.log('here -------');
    console.log(this.state.searchKey);
    //console.log(workflowData);
    axios.get('http://localhost:3001/workflows').then((res) => {
      console.log(res.data);
      if (this.state.searchKey === '' && this.state.filter === 'all') {
        this.setState(
          {
            workflows: res.data,
            workflowsOriginal: res.data
            //hello: 'ahah'
          },
          console.log(this.state)
        );
      } else {
        this.setState(
          {
            //workflows: res.data,
            workflowsOriginal: res.data
            //hello: 'ahah'
          },
          //search and filter function
          () => this.searchFilterWorkflow()
          //this.searchWorkflows(this.state.searchKey)
        );
      }
      /*
      console.log(res);
      this.setState(
        {
          workflows: res.data,
          workflowsOriginal: res.data,
          //hello: 'ahah'
        },
        console.log(this.state)
      ); */
    });
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

  saveWorkflow = (data, mode) => {
    const headers = {
      'Content-Type': 'application/json'
      //'Authorization': 'JWT fefege...'
    };
    let workflows = [];
    // save after edit and add
    console.log(this.props);
    if (mode === 'edit') {
      let position;
      let newArray = this.state.workflows.filter((element, index) => {
        //filter 'em elements
        if (data.id === element.id) {
          position = index;
        }
        return data.id === element.id;
      });
      console.log(position);
      console.log(newArray);
      axios
        .put(`http://localhost:3001/workflows/${data.id}`, data, {
          headers: headers
        })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            workflows = [...this.state.workflows];
            workflows[position] = data;
          }
        });

      //workflowData[position] = data;
      //console.log(workflowData);
    } else if (mode === 'add') {
      axios
        .post('http://localhost:3001/workflows', data, {
          headers: headers
        })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            workflows = [...this.state.workflows, response.data];
          }
        });

      //workflowData.push(data);
      console.log(workflows);
    }
    console.log(data);

    this.setState({
      workflows,
      workflowsOriginal: workflows
    });
  };

  searchWorkflows = (val) => {
    /*  console.log(this.state.workflowsOriginal)
   var newWorkflows =  this.state.workflowsOriginal.filter(item => {
    return item.name.includes(val)
    });
    console.log(newWorkflows) */
    this.setState({
      // workflows: newWorkflows,
      searchKey: val
    });
  };

  filterWorkflows = (filter) => {
    console.log(this.state.workflows);
    /* var newWorkflows =  this.state.workflows.filter(item => {
    return item.status === filter
    });
    console.log(newWorkflows) */

    console.log(filter);
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
    console.log(afterFilter)
    if (this.state.searchKey === '') {
      afterSearch = [...afterFilter];
    } else {
      afterSearch = afterFilter.filter((item) => {
        return item.name.includes(this.state.searchKey);
      });

    }
    console.log(afterSearch)
    this.setState({
      workflows: afterSearch
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if(this.state.filter !== prevState.filter || this.state.searchKey !== prevState.searchKey) {
      console.log(this.state.filter + ' .... ' + prevState.filter);
      console.log(this.state.searchKey + ' .... ' + prevState.searchKey);
     // this.filterWorkflows(this.state.filter);
     this.searchFilterWorkflow();
    }
  }
  deleteWorkflow = (id) => {
    axios.delete(`http://localhost:3001/workflows/${id}`).then((res) => {
      console.log(res);
      if (res.status === 200) {
        this.getWorkflows();
      }
    });
    /*
    console.log(typeof id);
    var newArr = this.state.workflows.filter((item) => {
      console.log(typeof item.id);
      return item.id !== parseInt(id);
    });
    console.log(newArr);
    this.setState({
      workflows: newArr
    }); */
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
          filterWorkflows: this.filterWorkflows
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
