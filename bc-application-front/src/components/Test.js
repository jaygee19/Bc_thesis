import React, { Component } from 'react';

class Test extends Component {
    constructor(props) {
        super(props)

        this.state = {
            navCollapsed: true,
        }

        this.setNavCollapsed = this.setNavCollapsed.bind(this)
    }

    setNavCollapsed(e) {
        this.setState({
            navCollapsed: !this.state.navCollapsed,
        })
    }

    render() {
        return (
            <div></div>
        )
    }

}

export default Test;
