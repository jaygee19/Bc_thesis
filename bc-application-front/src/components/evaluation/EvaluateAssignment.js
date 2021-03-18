import React, { Component } from 'react'
import Navigation from '../Navigation'

class EvaluateAssignment extends Component {
    constructor(props) {
        super(props)

        let filteredTask = this.props.tasks.filter(task => task.task_id == this.props.match.params.task)
        let filteredAssignment = filteredTask[0].submitted_assignments.filter(assignment => assignment.assignment_id == this.props.match.params.id)
        let filteredStudent = this.props.users.filter(user => user.user_id === filteredAssignment[0].student_id)
        this.state = {
            assignment: filteredAssignment[0],
            student: filteredStudent[0],
            task: filteredTask[0],
            evaluate: '',
            comment: '',
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.commentChanged = this.commentChanged.bind(this)
        this.evaluateChanged = this.evaluateChanged.bind(this)
    }

    commentChanged(event) {
        this.setState({
            comment: event.target.value,
        })
    }

    evaluateChanged(event) {
        this.setState({
            evaluate: event.target.value,
        })
    }

    onSubmit(event) {
        event.preventDefault()

        this.props.history.push('/assignedTasks/' + this.props.match.params.task)
    }

    render() {
        return (
            <div>
                <Navigation />
                <p></p>
                <div className="container">
                    <div className="jumbotron bg-white">
                        <h3>{this.state.task.title}</h3>
                        <p>{this.state.task.type}</p>
                        <hr />
                        <h5>{this.state.student.name} {this.state.student.surname}, {this.state.student.group}</h5>
                        <p></p>
                        {this.state.assignment.path_to_file !== null && (
                            <a className="btn btn-lg btn-dark" href={this.state.assignment.path_to_file} role="button">Zobraz odovzdané zadanie  &raquo;</a>
                        )}

                        <form onSubmit={this.onSubmit}>
                            <p></p>
                            <label className="d-flex justify-content-start">Počet bodov:</label>
                            <input type="text" className="col-1 form-control"
                                id="evaluate"
                                name="evaluate"
                                value={this.state.evaluate}
                                onChange={this.evaluateChanged}
                            />
                            <p></p>
                            <label className="d-flex justify-content-start">Komentár:</label>
                            <textarea type="text" className="form-control"
                                id="comment"
                                name="comment"
                                value={this.state.comment}
                                onChange={this.commentChanged}
                                >
                            </textarea>
                            <p></p>
                            <button className="w-50 btn btn-lg btn-dark" type="submit">Ulož</button>
                            <p></p>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default EvaluateAssignment
