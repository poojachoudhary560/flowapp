import React, { Component } from 'react'
import NodeCard from './NodeCard'

class NodeList extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    componentDidMount() {

        console.log(this.props);
      }
    render() {
        const {nodes} = this.props;

        return (
            <>
               {this.props.nodes.map((node) => {
                     return <NodeCard node={node} key={node.id}
                     handleNodeChange={this.props.handleNodeChange}

                     />
                })
            }
            </>
        )
    }
}

export default NodeList