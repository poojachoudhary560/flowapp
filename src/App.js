import React from 'react';
import './App.css';
import NavBarComponent from './components/navbar/NavBarComponent';
import LoginPage from './components/LoginPage';
import WorkflowBar from './components/workflow/WorkflowBar';
import NodeBar from './components/node/NodeBar';
import WorkflowCard from './components/workflow/WorkflowCard';

function App() {
  return (
    <div className="App">
      <NavBarComponent />
      <WorkflowBar />
      <LoginPage />
      <NodeBar/>
      <WorkflowCard />
    </div>
  );
}

export default App;
