import React, { Component } from 'react';
import NodeBar from './NodeBar';

import Row from 'react-bootstrap/Row';

import Container from 'react-bootstrap/Container';

import workflowData from '../../api/workflow';
import NodeCard from './NodeCard';
import NodeList from './NodeList';
import AppContext from '../../context/AppContext';

class NodeFlow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: Date.now(),
      name: '', //name
      status: 'pending',
      deleted: false,
      nodes: [
        {
          title: '',
          content: '',
          id: 1,
          status: 'pending'
        }
      ],
      mode: ''
    };
  }
  static contextType = AppContext;
  async componentDidMount() {
    // get id for next workflow and set
    // let id = this.context.state.workflows.length;
    // console.log(id)
    console.log(this.state.id);

    console.log(this.props);

    //this.props.match.params.id
    let data = {};

    if (this.props.match.params.id) {
      //
      data = this.context.getWorkflow(parseInt(this.props.match.params.id));
      console.log(data);
      if (data === undefined) {
        await this.context.getWorkflows();
        data = this.context.getWorkflow(parseInt(this.props.match.params.id));
      }
      const { id, name, deleted, nodes, status } = data;
      this.setState({
        id: id,
        name: name,
        deleted: deleted,
        nodes: nodes,
        status: status
      });
    }
  }

  handleChange = (event) => {
    let { value } = event.target;

    this.setState({
      name: value //name
    });
  };
  handleNodeChange = (event, id) => {
    console.log(event.target.value + '..... ' + id);
    let { name, value } = event.target;
    if (name === 'status') {
      let changeStateOrder = {
        pending: 'in-progress',
        'in-progress': 'completed',
        completed: 'pending'
      };
      value = changeStateOrder[value];
    }
    console.log(event.target.value + '..... ' + id);
    let newArr = this.state.nodes.filter((item) => item.id === id);
    let [item] = newArr;
    let updatedNode = {
      ...item,
      [name]: value
    };
    console.log(newArr);
    console.log(updatedNode);
    console.log(this.state.nodes);
    const indexOldElement = this.state.nodes.findIndex(
      (node) => node.id === id
    );
    const newArray = Object.assign([...this.state.nodes], {
      [indexOldElement]: updatedNode
    });
    this.setState({
      nodes: newArray
    });
    console.log(newArray);
  };
  handleClick = (event) => {
    let { name, value } = event.target;
    if (name === 'add') {
      let node = {
        title: '',
        // id: 1,
        content: '',
        status: 'pending',

        //name: "",
        //description: "",
        id: this.state.nodes.length > 0 ? this.state.nodes.length + 1 : 1
      };
      let nodes = [...this.state.nodes, node];
      this.setState({
        nodes
      });
    } else if (name === 'save') {
      //provide if for save or update
      let currentPath = this.props.location.pathname;
      if (currentPath.includes('/edit')) {
        this.context.saveWorkflow({ ...this.state }, 'edit');
      } else if (currentPath.includes('/add')) {
        this.context.saveWorkflow({ ...this.state }, 'add');
      }
    } else if (name === 'shuffle') {
      console.log(this.props);
      this.props.history.goBack();
    } else if (name === 'delete') {
      console.log(this.state.nodes);
      //this.props.history.goBack();
      let newNodes = [...this.state.nodes]
      let removeLast = newNodes.splice(-1,1);
      console.log(newNodes)
      this.setState({
        nodes: newNodes
      })
    }
  };

  render() {
    return (
      <>
        <Container fluid>
          {this.state.name}
          <NodeBar
            workspaceName={this.state.name}
            handleNameChange={this.handleChange}
            handleClick={this.handleClick}
          />
          <hr className="line-details" />
          <Row>
            <NodeList
              nodes={this.state.nodes}
              handleNodeChange={this.handleNodeChange}
            />
          </Row>
        </Container>
      </>
    );
  }
}

export default NodeFlow;
