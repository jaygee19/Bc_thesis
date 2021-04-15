import React, { Component } from 'react'
import Navigation from '../Navigation'
import { getAllErrors } from '../../helpers/ErrorHelper'

class EvaluateAssignment extends Component {
    constructor(props) {
        super(props)

        let filteredTask = this.props.tasks.filter(task => task.task_id == this.props.match.params.task)
        let filteredAssignment = filteredTask[0].submitted_assignments.filter(assignment => assignment.assignment_id == this.props.match.params.id)
        let filteredStudent = this.props.users.filter(user => user.user_id === filteredAssignment[0].student_id)
        let assignmentResult = filteredStudent[0].submitted_assignments.filter(assignment => assignment.assignment_id == filteredAssignment[0].assignment_id)

        this.state = {
            statusErrors: [],
            evaluationErrors: [],
            commentErrors: [],
        }

        if (assignmentResult[0].result !== null) {
            this.state = {
                assignment: filteredAssignment[0],
                student: filteredStudent[0],
                task: filteredTask[0],
                evaluation: assignmentResult[0].result.evaluation,
                comment: assignmentResult[0].result.comment,
                evaluatedBefore: true,
                resultID: assignmentResult[0].result.result_id,
            }
        } else {
            this.state = {
                assignment: filteredAssignment[0],
                student: filteredStudent[0],
                task: filteredTask[0],
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
        return 'http://127.0.0.1:8000/storage'+path
    }

    onSubmit(event) {
        event.preventDefault()

        if(this.state.evaluatedBefore){
            console.log("SOM DOBRE", this.state.resultID)
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
                    statusErrors: e.response.data['status'] || [],
                    evaluationErrors: e.response.data['evaluation'] || [],
                    commentErrors: e.response.data['comment'] || [],
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
                    statusErrors: e.response.data['status'] || [],
                    evaluationErrors: e.response.data['evaluation'] || [],
                    commentErrors: e.response.data['comment'] || [],
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
                        <p>{this.state.task.type}</p>
                        <hr />
                        <h5>{this.state.student.name} {this.state.student.surname}, {this.state.student.group}</h5>
                        <p> Vypracované zadanie: </p>
                        {this.state.assignment.path_to_file !== null && (
                            <a className="btn btn-lg btn-dark" href={this.showAssignment(this.state.assignment.path_to_file.substr(6))} target="_blank" download>
                                {this.state.assignment.file_name.substr(12)} 
                            </a>
                        )}

                        <form onSubmit={this.onSubmit}>
                            <p></p>
                            <label className="d-flex justify-content-start">Počet bodov:</label>
                            <input type="text" className="col-1 form-control"
                                id="evaluation"
                                name="evaluation"
                                value={this.state.evaluation}
                                onChange={this.evaluationChanged}
                                required
                            />
                            {getAllErrors(this.state.evaluationErrors)} 
                            <p></p>
                            <label className="d-flex justify-content-start">Komentár:</label>
                            <textarea type="text" className="form-control"
                                id="comment"
                                name="comment"
                                value={this.state.comment}
                                onChange={this.commentChanged}
                                required
                            >
                            </textarea>
                            {getAllErrors(this.state.commentErrors)} 
                            {getAllErrors(this.state.statusErrors)} 
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
