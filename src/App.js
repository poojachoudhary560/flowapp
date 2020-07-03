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
import { Router, Route, Switch, Redirect } from 'react-router-dom';
//import createHistory from 'history/createBrowserHistory'
import history from './router/history';
import UserProvider from './context/user/UserProvider';
import UserContext from './context/user/UserContext';
import ProtectedRoute from './router/ProtectedRoute';
import GenericNotFound from './components/common/GenericNotFound';

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

  static contextType = UserContext;

  render() {
    return (
      <div className='App'>
        <Router history={history}>
          <UserProvider>
            <AppProvider>
              <NavBarComponent />
              <Switch>
                <Route path='/' component={LoginPage} exact />
                <ProtectedRoute path='/home' component={WorkflowList} />
                <ProtectedRoute path='/add' component={NodeFlow} />
                <ProtectedRoute path='/edit/:id' component={NodeFlow} />
                <Route component={GenericNotFound} />
              </Switch>
            </AppProvider>
          </UserProvider>
        </Router>
      </div>
    );
  }
}

export default App;
