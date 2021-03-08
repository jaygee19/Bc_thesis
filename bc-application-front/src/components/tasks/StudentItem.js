import { React, Component } from 'react'
import { withRouter } from 'react-router-dom'

class StudentItem extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <p> {this.props.name} </p>
            </div>
        )
    }
}

export default withRouter(StudentItem)