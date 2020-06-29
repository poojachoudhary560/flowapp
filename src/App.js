import React, { Component } from 'react';
import './App.css';
import NavBarComponent from './components/navbar/NavBarComponent';
import LoginPage from './components/LoginPage';
import WorkflowBar from './components/workflow/WorkflowBar';
import NodeBar from './components/node/NodeBar';
import WorkflowCard from './components/workflow/WorkflowCard';
import WorkflowList from './components/workflow/WorkflowList';
import NodeFlow from './components/node/NodeFlow';
import AppProvider from './context/AppProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import createHistory from 'history/createBrowserHistory'
import history from './router/history';
import UserProvider from './context/user/UserProvider';

class App extends Component {
  state = {
    isLoggedIn: true,
    editWorkflow: false
  };
  checkLoggedStatus = (val) => {
    if (val === 'in') {
      this.setState({
        isLoggedIn: true
      });
    }
  };
  render() {
    return (
      <div className='App'>
        <Router history={history}>
          <UserProvider>
          <AppProvider>
            <NavBarComponent />
            <Switch>
              <Route path='/' exact component={WorkflowList} />
              <Route path='/add' component={NodeFlow} />
              <Route path='/edit/:id' component={NodeFlow} />
              <Route path='/login' component={LoginPage} />
            </Switch>
          </AppProvider>
          </UserProvider>
        </Router>
      </div>
    );
  }
}

export default App;
