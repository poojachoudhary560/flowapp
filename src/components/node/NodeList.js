import React, { Component } from 'react';
import NodeCard from './NodeCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
class NodeList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    return (
      <>
        <Container fluid>
          <Row>
          <Col>
              {this.props.nodesTitleInvalid &&
              <p style={{color: 'red', marginTop: '1rem', marginBottom: '0'}}>Node Title cannot be empty</p>}
            </Col>
          </Row>
          <Row>

            {this.props.nodes.map((node, index) => {
              return (
                <NodeCard
                  node={node}
                  key={node.id}
                  handleNodeChange={this.props.handleNodeChange}
                  showArrow={
                    this.props.nodes.length - 1 === index ? false : true
                  }
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
