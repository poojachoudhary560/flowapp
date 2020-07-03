import React, { Component } from 'react';
import NodeBar from './NodeBar';

import Row from 'react-bootstrap/Row';

import axios from 'axios';
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
      isWorkflowNameInvalid: false,
      nodesTitleInvalid: false,
      status: 'pending',
      deleted: false,
      nodes: [
      /*  {
          title: '',
          content: '',
          id: 1,
          status: 'pending'
        } */
      ],
      mode: ''
    };
  }
  static contextType = AppContext;
  async componentDidMount() {
    let data = {};

    if (this.props.match.params.id) {
      axios
        .get(`http://localhost:3001/workflows/${this.props.match.params.id}`)
        .then((res) => {
          const { id, name, deleted, nodes, status } = res.data;
          this.setState({
            id: id,
            name: name,
            deleted: deleted,
            nodes: nodes,
            status: status
          });
        });
    }
  }

  shuffle = (array) => {
    var counter = array.length,
      temp,
      index;
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  };

  handleChange = (event) => {
    let { value } = event.target;

    this.setState({
      name: value //name
    });
  };

  shouldNodeStateChange = (id) => {
    const { nodes } = this.state;
    console.log(id);
    var flag = 0;

    for (let i = 0; i < nodes.length; i++) {
      console.log(nodes[i]);
      if (nodes[i].id === id) {
        if (flag === i) {
          return true;
        }
        break;
      } else {
        if (nodes[i].status !== 'completed') {
          // cannot update
          break;
        } else {
          flag += 1;
        }
      }
    }

    return false;
  };
  handleNodeChange = (event, id) => {
    let { name, value } = event.target;
    if (name === 'status') {
      let changeStateOrder = {
        pending: 'in-progress',
        'in-progress': 'completed',
        completed: 'pending'
      };
      value = changeStateOrder[value];
      if (value === 'completed') {
        let next = this.shouldNodeStateChange(id);

        if (!next) {
          return;
        }
      }
    }
    let newArr = this.state.nodes.filter((item) => item.id === id);
    let [item] = newArr;
    let updatedNode = {
      ...item,
      [name]: value
    };
    const indexOldElement = this.state.nodes.findIndex(
      (node) => node.id === id
    );
    const newArray = Object.assign([...this.state.nodes], {
      [indexOldElement]: updatedNode
    });
    this.setState({
      nodes: newArray
    });
  };

  workflowValidation = () => {
    let isWorkflowNameInvalid = false;
    if (!this.state.name) {
      isWorkflowNameInvalid = true;
    }
    console.log(this.state.name)
    console.log(isWorkflowNameInvalid)
    this.setState({
      isWorkflowNameInvalid
    })
    if(isWorkflowNameInvalid) {
      return false;
    }
    return true;

  }
  nodeValidation = () => {
    const {nodes} = this.state;
    let nodesArr = [...nodes]

    let invalidFlag = 0
    for(let i=0; i<nodesArr.length; i++) {
      if(!nodesArr[i].title) {
        invalidFlag += 1;

      }
    }


    if(invalidFlag > 0) {
      this.setState({
        nodesTitleInvalid: true
      })
      return false;
    }
    return true;

  }
  allValidations = () => {
    let nodeValidations = this.nodeValidation();
    let workflowValidations = this.workflowValidation();

    console.log(workflowValidations);
    return workflowValidations && nodeValidations;
  }
  handleClick = async (event) => {
    let { name, value } = event.target;
    if (name === 'add') {
      let node = {
        title: '',
        content: '',
        status: 'pending',
        id: this.state.nodes.length > 0 ? this.state.nodes.length + 1 : 1
      };
      let nodes = [...this.state.nodes, node];
      this.setState({
        nodes
      });
    } else if (name === 'save') {
      // node empty check
      let next = this.allValidations();
      if(!next) {
        return;
      }


      //provide if for save or update
      let currentPath = this.props.location.pathname;
      console.log(this.state.nodes)
      if (currentPath.includes('/edit')) {
        await this.context.saveWorkflow({ ...this.state }, 'edit');
      } else if (currentPath.includes('/add')) {
        await this.context.saveWorkflow({ ...this.state }, 'add');
      }
    } else if (name === 'shuffle') {
      let copy = [...this.state.nodes];
      let shuffledArr = this.shuffle(copy);
      this.setState({
        nodes: shuffledArr
      });
    } else if (name === 'delete') {
      let newNodes = [...this.state.nodes];
      let removeLast = newNodes.splice(-1, 1);
      this.setState({
        nodes: newNodes
      });
    }
  };

  render() {
    return (
      <>
        <Container fluid>

          <NodeBar
            workspaceName={this.state.name}
            isWorkflowNameInvalid={this.state.isWorkflowNameInvalid}
            workspaceStatus={this.state.status}
            handleNameChange={this.handleChange}
            handleClick={this.handleClick}
          />
          <hr className='line-details' />
          <Row>
            <NodeList
              nodesTitleInvalid = {this.state.nodesTitleInvalid}
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
