import React, {Component} from 'react'


export default class Paragraph extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<p>{this.props.content}</p>)
    }
}
