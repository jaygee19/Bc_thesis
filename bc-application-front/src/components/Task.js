import { React, Component } from 'react'
import { withRouter } from 'react-router-dom'

class Task extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container col-6">
                <div className="row">
                    <div className="col-12 jumbotron">
                        <h1 className="display-4">Title</h1>
                        <p className="lead">Content</p>
                        <hr className="my-4" />
                        <p>{this.props.content}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Task)