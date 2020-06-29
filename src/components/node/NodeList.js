import React, { Component } from 'react';
import NodeCard from './NodeCard';
import Row from 'react-bootstrap/Row';

import Container from 'react-bootstrap/Container';
class NodeList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { nodes } = this.props;

    return (
      <>
        <Container fluid>
          <Row>
            {this.props.nodes.map((node, index) => {
              return (
                <NodeCard
                  node={node}
                  key={node.id}
                  handleNodeChange={this.props.handleNodeChange}
                  showArrow={(this.props.nodes.length-1)===index ? false : true}
                />
              );
            })}
          </Row>
        </Container>
      </>
    );
  }
}

export default NodeList;
