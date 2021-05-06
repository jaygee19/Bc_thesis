import React, { Component } from 'react'
import Navigation from '../Navigation'
import dateFormat from 'dateformat';
import { getAllErrors } from '../../helpers/ErrorHelper'
import { getTypeInSlovak } from '../../helpers/StyleHelper';

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
                    if (assignment !== undefined) {
                        assignments.push(assignment)
                    }
                }
            }
        }

        if (assignments.length > 0 && task.verified) {
            similarities = assignments.filter((assignment) => assignment.compared_pair !== null || assignment.compared_pair_second)
        }

        let visible = false
        if (students.length / assignments.length === 1) {
            visible = true
        }

        this.state = {
            concreteTask: task,
            assignedStudents: students,
            similarAssignments: similarities,
            assignmentsForTask: assignments,
            visibleCheck: visible,
            status_errors: [],
        }

        this.onRemove = this.onRemove.bind(this)
        this.onDisplay = this.onDisplay.bind(this)
        this.onVerify = this.onVerify.bind(this)
    }

    toDate(time) {
        return dateFormat(time, "d.mm.yyyy, HH:MM")
    }

    isSubmitted(array) {
        let assignment = array.filter(item => item.task_id == this.props.match.params.id)
        return assignment.length !== 0
    }

    isSubmittedBeforeDeadline(array) {
        let assignment = array.filter(item => item.task_id == this.props.match.params.id)
        let date_deadline = new Date(this.state.concreteTask.deadline)
        let submitted_day = new Date(assignment[0].submit_date)
        if (submitted_day > date_deadline) {
            return false
        } else {
            return true
        }
    }

    submitDate(array) {
        let assignment = array.filter(item => item.task_id == this.props.match.params.id)
        return this.toDate(assignment[0].submit_date)
    }

    isEvaluated(array) {
        let assignment = array.filter(item => item.task_id === this.state.concreteTask.task_id)
        if (assignment.length !== 0) {
            return assignment[0].result !== null
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
                    status_errors: e.response.data['status'] || [],
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

    getStudentPairs(pair) {
        if (pair !== null) {
            let first = this.props.allAssignments.filter((a) => a.assignment_id === pair.assignment_first_id)[0]
            let second = this.props.allAssignments.filter((b) => b.assignment_id === pair.assignment_second_id)[0]
            let new_pair = this.props.users.filter((student) => student.user_id === first.student_id || student.user_id === second.student_id)
            return new_pair
        }
    }

    checkTime(assignments, pair) {
        let assignment = assignments.filter(a => a.assignment_id === pair.assignment_first_id || pair.assignment_second_id)[0]
        return this.toDate(assignment.submit_date)
    }

    checkTitle(assignments, pair) {
        if(this.state.concreteTask.type === 'semester_work') {
            let assignment = assignments.filter(a => a.assignment_id === pair.assignment_first_id ||  a.assignment_id === pair.assignment_second_id)[0]
            let task = this.props.tasks.filter(t => t.task_id === assignment.task_id)[0]
            return ', ' + task.title 
        } else {
            return null
        }
    }

    render() {
        return (
            <div >
                <div style={{ color: 'white' }}>
                    <Navigation />
                    <p></p>
                    <div className="container borders">
                        <h3>Zoznam pridelených študentov:</h3>
                        <br />
                        <h2 className="blog-post-title">{this.state.concreteTask.title}</h2>
                        <p className="blog-post-meta"> {getTypeInSlovak(this.state.concreteTask.type)}</p>
                        <p className="blog-post-meta"> Deadline: {this.toDate(this.state.concreteTask.deadline)}</p>
                        <p className="blog-post-meta"> Počet odovzdaných prác: </p>
                        <p className="blog-post-meta"> <b> {this.state.assignmentsForTask.length} / {this.state.assignedStudents.length} </b> </p>
                        {(this.state.concreteTask.path_to_file !== null) && (
                            <p> Zadanie: <a href={this.showTask(this.state.concreteTask.path_to_file.substr(6))} download>
                                {this.state.concreteTask.file_name.substr(12)}
                            </a> </p>
                        )}
                        {!this.state.concreteTask.verified && this.state.concreteTask.type !== 'homework' && this.state.concreteTask.type !== 'first_check' && this.state.visibleCheck && (
                            <button onClick={() => this.onVerify(this.state.concreteTask.task_id)} className="btn btn-info btn-bg">Kontrola originality</button>
                        )}
                    </div>
                    {this.state.concreteTask.verified && (
                        <div className="container ">
                            <div>
                                <p className="list-group-item list-group-item-warning no-marg">Zadanie prešlo kontrolou originality prác</p>
                            </div>
                            {this.state.similarAssignments.length > 0 && (
                                <div className="card" style={{ color: 'black' }}>
                                    <p></p>
                                    <h5 className="justify-content-start">
                                        <u>Zoznam potenciálnych zhôd:</u>
                                    </h5>


                                    {this.state.similarAssignments.map((chosen) => {
                                        if (chosen.compared_pair !== null) {
                                            return (
                                                <p> {this.getStudentPairs(chosen.compared_pair).map((temp) => {
                                                    return (
                                                        <span> <b> {temp.name} {temp.surname} </b> ( {this.checkTime(temp.submitted_assignments, chosen.compared_pair)} {this.checkTitle(temp.submitted_assignments, chosen.compared_pair)}) <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                                        </svg> </span>
                                                    )
                                                })}
                                                    <span className=" list-group-item-danger no-marg" > {' '} {chosen.compared_pair.percentage_match} {'%'} </span> 
                                                 </p>
                                            )
                                        } else if (chosen.compared_pair_second !== null && this.state.concreteTask.type === 'semester_work') {
                                            return (
                                                <p> {this.getStudentPairs(chosen.compared_pair_second).map((temp) => {
                                                    return (
                                                        <span> <b> {temp.name} {temp.surname} </b> ( {this.checkTime(temp.submitted_assignments, chosen.compared_pair_second)} {this.checkTitle(temp.submitted_assignments, chosen.compared_pair_second)}) <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                                        </svg> </span>
                                                    )
                                                })}
                                                    <span className=" list-group-item-danger no-marg" > {' '} {chosen.compared_pair_second.percentage_match} {'%'} </span> 
                                                 </p>
                                            )
                                        }
                                    })}

                                </div>
                            )}
                            {this.state.similarAssignments.length === 0 && (
                                <div className="card" style={{ color: 'black' }}>
                                    <p></p>
                                    <h5 className="justify-content-start">
                                        <u>Zoznam potenciálnych zhôd:</u>
                                    </h5>
                                    <p> Nebola nájdená žiadna zhoda. </p>
                                </div>
                            )}
                        </div>
                    )}
                    <hr />
                </div>
                <div className="container ">
                    <p></p>
                    <table className="table table-hover table-bordered table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Študent</th>
                                <th scope="col">Skupina</th>
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
                                                <td onClick={() => this.onDisplay(chosen.submitted_assignments)}> <button className="btn btn-sm btn-success"> <i> Hodnotené </i> </button> </td>
                                            )}

                                            { this.isSubmitted(chosen.submitted_assignments) && !this.isEvaluated(chosen.submitted_assignments) && (
                                                <td onClick={() => this.onDisplay(chosen.submitted_assignments)}> <button className="btn btn-sm btn-info"> Ohodnoť </button> </td>
                                            )}

                                            {!this.isSubmitted(chosen.submitted_assignments) && (
                                                <td> <i> Nehodnotené </i> </td>
                                            )}
                                            {!this.isSubmitted(chosen.submitted_assignments) && (
                                                <td onClick={() => this.onRemove(chosen.user_id)}> <button className="btn btn-sm btn-info"> x </button> </td>
                                            )}
                                            {this.isSubmitted(chosen.submitted_assignments) && (
                                                <td> - </td>
                                            )}
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                    {getAllErrors(this.state.status_errors)}
                </div>
            </div>
        )
    }
}

export default AssignedTasks

