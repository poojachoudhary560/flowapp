import React, { Component } from 'react';
import './App.css';
import NavBarComponent from './components/navbar/NavBarComponent';
import LoginPage from './components/LoginPage';


import WorkflowList from './components/workflow/WorkflowList';
import NodeFlow from './components/node/NodeFlow';
import AppProvider from './context/AppProvider';
import { HashRouter, Route, Switch } from 'react-router-dom';
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
        <HashRouter history={history}>
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
        </HashRouter>
      </div>
    );
  }
}

export default App;
