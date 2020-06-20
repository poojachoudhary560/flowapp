import React, { Component } from 'react';
import './App.css';
import NavBarComponent from './components/navbar/NavBarComponent';
import LoginPage from './components/LoginPage';
import WorkflowBar from './components/workflow/WorkflowBar';
import NodeBar from './components/node/NodeBar';
import WorkflowCard from './components/workflow/WorkflowCard';
import WorkflowList from './components/workflow/WorkflowList';

class App extends Component {
  state = {
    isLoggedIn: true
  }
  checkLoggedStatus = (val) => {
    if(val === 'in') {
      this.setState({
        isLoggedIn: true
      });
    }
  }
  render() {
    return (
      <div className="App">

        <NavBarComponent />

        {!this.state.isLoggedIn && <LoginPage isLoggedIn={this.state.isLoggedIn} loggedStatus={this.checkLoggedStatus}/>}
        {this.state.isLoggedIn && <WorkflowList />}


      </div>
    );
  }
}

export default App;
