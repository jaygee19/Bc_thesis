import React, { Component } from 'react'
import Navigation from '../Navigation'
import { getAllErrors } from '../../helpers/ErrorHelper'
import { getMaxNumberOfPoints, getTypeInSlovak } from '../../helpers/StyleHelper'

class EvaluateAssignment extends Component {
    constructor(props) {
        super(props)

        let filtered_task = this.props.tasks.filter(task => task.task_id == this.props.match.params.task)
        let filtered_assignment = filtered_task[0].submitted_assignments.filter(assignment => assignment.assignment_id == this.props.match.params.id)
        let filtered_student = this.props.users.filter(user => user.user_id === filtered_assignment[0].student_id)
        let assignment_result = filtered_student[0].submitted_assignments.filter(assignment => assignment.assignment_id == filtered_assignment[0].assignment_id)

        this.state = {
            status_errors: [],
            evaluation_errors: [],
            comment_errors: [],
        }

        if (assignment_result[0].result !== null) {
            this.state = {
                assignment: filtered_assignment[0],
                student: filtered_student[0],
                task: filtered_task[0],
                evaluation: assignment_result[0].result.evaluation,
                comment: assignment_result[0].result.comment,
                evaluatedBefore: true,
                resultID: assignment_result[0].result.result_id,
            }
        } else {
            this.state = {
                assignment: filtered_assignment[0],
                student: filtered_student[0],
                task: filtered_task[0],
                evaluation: '',
                comment: '',
                evaluatedBefore: false,
            }
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.commentChanged = this.commentChanged.bind(this)
        this.evaluationChanged = this.evaluationChanged.bind(this)
    }

    commentChanged(event) {
        this.setState({
            comment: event.target.value,
        })
    }

    evaluationChanged(event) {
        this.setState({
            evaluation: event.target.value,
        })
    }

    showAssignment(path) {
        return 'http://127.0.0.1:8000/storage' + path
    }

    onSubmit(event) {
        event.preventDefault()

        if (this.state.evaluatedBefore) {
            this.props
                .onUpdate({
                    evaluation: this.state.evaluation,
                    comment: this.state.comment,
                    id: this.state.assignment.assignment_id,
                    user_id: this.state.student.user_id,
                    result_id: this.state.resultID,
                })
                .then(() => {
                    this.props.history.push('/assignedTasks/' + this.state.task.task_id)
                })
                .catch((e) => {
                    this.setState({
                        status_errors: e.response.data['status'] || [],
                        evaluation_errors: e.response.data['evaluation'] || [],
                        comment_errors: e.response.data['comment'] || [],
                    })
                })
        } else {
            this.props
                .onSubmit({
                    evaluation: this.state.evaluation,
                    comment: this.state.comment,
                    id: this.state.assignment.assignment_id,
                    user_id: this.state.student.user_id,
                })
                .then(() => {
                    this.props.history.push('/assignedTasks/' + this.state.task.task_id)
                })
                .catch((e) => {
                    this.setState({
                        status_errors: e.response.data['status'] || [],
                        evaluation_errors: e.response.data['evaluation'] || [],
                        comment_errors: e.response.data['comment'] || [],
                    })
                })
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <p></p>
                <div className="container">
                    <div className="jumbotron bg-white">
                        <h3>{this.state.task.title}</h3>
                        <p>{getTypeInSlovak(this.state.task.type)}</p>
                        <h4>{this.state.student.name} {this.state.student.surname}, {this.state.student.group}</h4>
                        <hr/>
                        <p> <b> Vypracované zadanie: </b> </p>
                        {this.state.assignment.path_to_file !== null && (
                            <a className="btn btn-lg btn-info" href={this.showAssignment(this.state.assignment.path_to_file.substr(6))} target="_blank" download>
                                {this.state.assignment.file_name.substr(12)}
                            </a>
                        )}

                        <form onSubmit={this.onSubmit}>
                            <p></p>
                            <label className="d-flex justify-content-start"> <b> Počet bodov: / {getMaxNumberOfPoints(this.state.task.type)} </b>
                            </label>
                            <input type="text" className="col-1 form-control"
                                id="evaluation"
                                name="evaluation"
                                value={this.state.evaluation}
                                onChange={this.evaluationChanged}
                                required
                            />
                            {getAllErrors(this.state.evaluation_errors)}
                            <p></p>
                            <label className="d-flex justify-content-start"> <b> Komentár: </b> </label>
                            <textarea type="text" className="form-control"
                                id="comment"
                                name="comment"
                                value={this.state.comment}
                                onChange={this.commentChanged}
                                required
                            >
                            </textarea>
                            {getAllErrors(this.state.comment_errors)}
                            {getAllErrors(this.state.status_errors)}
                            <p></p>
                            <button className="w-50 btn btn-lg btn-info" type="submit">Ulož</button>
                            <p></p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EvaluateAssignment
