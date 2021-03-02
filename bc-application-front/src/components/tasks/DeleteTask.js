import React, { Component } from 'react'
import Navigation from '../Navigation';
import { getApiResponse } from '../../helpers/ApiHelper'

class DeleteTask extends Component {
    constructor(props) {
        super(props)
        if (this.props.match.params.id != null) {
            let task = this.props.tasks.filter(
                (item) => item.task_id === parseInt(this.props.match.params.id)
            )[0]
            this.state = {
                id: task.task_id,
            }
        }
        this.onYes = this.onYes.bind(this)
        this.onNo = this.onNo.bind(this)
    }

    onYes(event) {
        event.preventDefault()

        getApiResponse('tasks/' + this.state.id, 'delete', {
        })
        .then(() => {
            this.props.history.push('/')
        })
    }

    onNo(event) {
        event.preventDefault()

        this.props.history.push('/myTasks')
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="container">
                    <p></p>
                    <h3>Really?</h3>
                    <button onClick={() => this.props.onDelete(this.state.id)} type="submit" className="btn btn-primary" > Ano </button>
                    <button onClick={this.onNo} type="submit" className="btn btn-primary" > Nie </button>
                </div>
            </div>
        )
    }
}

export default DeleteTask;