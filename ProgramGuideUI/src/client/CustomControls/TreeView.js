import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';
import style from './treeViewStyles';

class TreeView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled) {
        console.log(node.value);
        if (this.state.cursor) { this.state.cursor.active = false; }
        node.active = true;
        if (node.children) { node.toggled = toggled; }
        this.setState({ cursor: node });
        this.props.CallBack(node);
    }
    render() {
        console.log(this.props)
        return (
            <Treebeard
                style={style}
                data={this.props.setData}
                onToggle={this.onToggle}
            />
        );
    }
}

export default TreeView;
