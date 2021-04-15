import React, { Component } from 'react'
import Navigation from '../Navigation'
import dateFormat from 'dateformat';
import { getAllErrors } from '../../helpers/ErrorHelper'

class AssignedTasks extends Component {
    constructor(props) {
        super(props)

        let task = this.props.tasks.filter((task) => task.task_id === parseInt(this.props.match.params.id))[0]

        let students = []
        let assignments = []
        let similarities = []

        for (let j = 0; j < this.props.users.length; j++) {
            const student = this.props.users[j]
            for (let k = 0; k < this.props.users[j].stud_tasks.length; k++) {
                const student_task = this.props.users[j].stud_tasks[k]
                if (student_task.task_id === task.task_id) {
                    const assignment = student.submitted_assignments.filter(a => a.task_id === task.task_id)[0]
                    students.push(student)
                    assignments.push(assignment)
                }
            }
        }

        similarities = assignments.filter((assignment) => assignment.compared_pair !== null)

        console.log(similarities)

        this.state = {
            concreteTask: task,
            assignedStudents: students,
            similarAssignments: similarities,
            assignmentsForTask: assignments,
        }

        this.onRemove = this.onRemove.bind(this)
        this.onDisplay = this.onDisplay.bind(this)
        this.onVerify = this.onVerify.bind(this)
    }

    toDate(time) {
        return dateFormat(time, "d.mm.yyyy, HH:MM")
    }

    isSubmitted(array) {
        let temp = array.filter(item => item.task_id == this.props.match.params.id)
        return temp.length !== 0
    }

    isSubmittedBeforeDeadline(array) {
        let temp = array.filter(item => item.task_id == this.props.match.params.id)
        let dateDeadline = new Date(this.state.concreteTask.deadline)
        let submittedDay = new Date(temp[0].submit_date)
        if (submittedDay > dateDeadline) {
            return false
        } else {
            return true
        }
    }

    submitDate(array) {
        let temp = array.filter(item => item.task_id == this.props.match.params.id)
        return this.toDate(temp[0].submit_date)
    }

    isEvaluated(array) {
        let filtered = array.filter(item => item.task_id === this.state.concreteTask.task_id)
        if (filtered.length !== 0) {
            return filtered[0].result !== null
        } else {
            return false
        }
    }

    showTask(path) {
        return 'http://127.0.0.1:8000/storage' + path
    }

    onRemove(id) {
        this.props
            .onDelete({
                student_id: id,
                task_id: this.state.concreteTask.task_id,
            })
            .then(() => {
                this.props.history.push('/myTasks')
            })
            .catch((e) => {
                this.setState({
                    statusErrors: e.response.data['status'] || [],
                })
            })
    }

    onDisplay(array) {
        let chosen_assignment = array.filter(item => item.task_id == this.props.match.params.id)
        this.props.history.push('/evaluate/' + this.props.match.params.id + '/assignment/' + chosen_assignment[0].assignment_id)
    }

    onVerify(id) {
        this.props.onVerify(id)
    }

    getStudents(pair) {
        let first = this.state.assignmentsForTask.filter((a) => a.assignment_id === pair.assignment_first_id)[0]
        let second = this.state.assignmentsForTask.filter((b) => b.assignment_id === pair.assignment_second_id)[0]
        let newPair = this.state.assignedStudents.filter((student) => student.user_id === first.student_id || student.user_id === second.student_id)
        return newPair
    }

    render() {
        return (
            <div>
                <div style={{ color: 'white' }}>
                    <Navigation />
                    <p></p>
                    <h3>Zoznam pridelených študentov:</h3>
                    <br />
                    <h2 className="blog-post-title">{this.state.concreteTask.title}</h2>
                    <p className="blog-post-meta"> Deadline: {this.toDate(this.state.concreteTask.deadline)}</p>
                    {(this.state.concreteTask.path_to_file !== null) && (
                        <p> Zadanie: <a href={this.showTask(this.state.concreteTask.path_to_file.substr(6))} download>
                            {this.state.concreteTask.file_name.substr(12)}
                        </a> </p>
                    )}
                    {!this.state.concreteTask.verified && this.state.concreteTask.type !== 'homework' && this.state.concreteTask.type !== 'first_check' && (
                        <button onClick={() => this.onVerify(this.state.concreteTask.task_id)} className="btn btn-light">Kontrola zhody</button>
                    )}
                    {this.state.concreteTask.verified && (
                        <div className="container">
                            <div>
                                <p className="list-group-item list-group-item-warning no-marg">Zadanie prešlo kontrolou originality prác</p>
                            </div>
                            <div className="card" style={{ color: 'black' }}>
                                <p></p>
                                <h5 className="justify-content-start">
                                    <u>Zoznam potenciálnych zhôd:</u>
                                </h5>
                                {this.state.similarAssignments.map((chosen) => {
                                    return (
                                        <p> {this.getStudents(chosen.compared_pair).map((temp) => {
                                            return (
                                                <span> {temp.name} {temp.surname} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                                </svg> </span>
                                            )
                                        })}
                                           <span className=" list-group-item-danger no-marg" > {' '} {chosen.compared_pair.percentage_match} {'%'} </span> </p>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    <hr />
                </div>
                <div className="container">
                    <p></p>
                    <table className="table table-hover table-bordered table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Študent</th>
                                <th scope="col">Skupina</th>
                                {/* <th scope="col">Stav</th> */}
                                <th scope="col">Čas odovzdania</th>
                                <th scope="col">Stav hodnotenia</th>
                                <th scope="col">Odobrať</th>
                            </tr>
                        </thead>
                        <tbody className="table-secondary">
                            {this.state.assignedStudents
                                .map((chosen) => {
                                    return (
                                        <tr key={chosen.user_id}>
                                            <td>{chosen.name} {chosen.surname}</td>
                                            <td>{chosen.group}</td>
                                            {/* { this.isSubmitted(chosen.submitted_assignments) && (
                                                <td className="table-success"></td>
                                            )}
                                            { !this.isSubmitted(chosen.submitted_assignments) && (
                                                <td className="table-danger"></td>
                                            )} */}

                                            {this.isSubmitted(chosen.submitted_assignments) && this.isSubmittedBeforeDeadline(chosen.submitted_assignments) && (
                                                <td className="table-success"> { this.submitDate(chosen.submitted_assignments)} </td>
                                            )}

                                            {this.isSubmitted(chosen.submitted_assignments) && !this.isSubmittedBeforeDeadline(chosen.submitted_assignments) && (
                                                <td className="table-danger"> { this.submitDate(chosen.submitted_assignments)} </td>
                                            )}

                                            {!this.isSubmitted(chosen.submitted_assignments) && (
                                                <td> - </td>
                                            )}

                                            { this.isSubmitted(chosen.submitted_assignments) && this.isEvaluated(chosen.submitted_assignments) && (
                                                <td className="table-success" onClick={() => this.onDisplay(chosen.submitted_assignments)}> <button className="btn-dark"> <i> Hodnotené </i> </button> </td>
                                            )}

                                            { this.isSubmitted(chosen.submitted_assignments) && !this.isEvaluated(chosen.submitted_assignments) && (
                                                <td onClick={() => this.onDisplay(chosen.submitted_assignments)}> <button className="btn-dark"> Ohodnoť </button> </td>
                                            )}

                                            {!this.isSubmitted(chosen.submitted_assignments) && (
                                                <td> <i> Nehodnotené </i> </td>
                                            )}
                                            {!this.isSubmitted(chosen.submitted_assignments) && (
                                                <td onClick={() => this.onRemove(chosen.user_id)}> <button className="btn-dark"> x </button> </td>
                                            )}
                                            {this.isSubmitted(chosen.submitted_assignments) && (
                                                <td> - </td>
                                            )}
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                    {getAllErrors(this.state.statusErrors)}
                </div>
            </div>
        )
    }
}

export default AssignedTasks

