import React, { Component } from 'react'
import Navigation from '../Navigation'
import dateFormat from 'dateformat'
import Countdown from 'react-countdown'
import Modal from 'react-bootstrap/Modal'

class StudentTasks extends Component {
    constructor(props) {
        super(props)

        let teacher = this.props.users.filter(u => u.user_id === this.props.group.teacher)
        let tasks = this.props.user.stud_tasks
        let sub = this.props.user.submitted_assignments
        this.state = {
            concreteTeacher: teacher[0],
            studentTasks: tasks,
            submittedAssignments: sub,
            count: 0,
            showModal: false,
            evaluation: '',
            comment: '',
            taskResult: '',
        }

        this.onClick = this.onClick.bind(this)
    }

    toDate(time) {
        return dateFormat(time, "d.mm.yyyy, HH:MM")
    }

    onClick(id) {
        this.props.history.push('/manageAssignment/' + id)
    }

    dayOfWeek(dayIndex) {
        return ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"][dayIndex] || '';
    }

    isSubmitted(id) {
        let temp = this.state.submittedAssignments.filter(s => s.task_id === id)
        return temp.length !== 0
    }

    isEvaluated(id) {
        let filtered = this.state.submittedAssignments.filter(item => item.task_id === id)
        if (filtered.length !== 0) {
            return filtered[0].result !== null
        } else {
            return false
        }
    }

    timeBeforeDeadline(id) {
        let filtered = this.state.studentTasks.filter(item => item.task_id === id)
        let dateDeadline = new Date(filtered[0].deadline)
        let today = new Date(Date())

        const result = Math.abs(dateDeadline - today)

        if (dateDeadline > today) {
            return Math.round(result)
        } else {
            return Math.round(0)
        }
    }

    isSubmittedBeforeDeadline(id) {
        let filteredAssignment = this.state.submittedAssignments.filter(item => item.task_id === id)
        let filteredTask = this.state.studentTasks.filter(item => item.task_id === id)
        if (filteredAssignment[0] === undefined) {
            return true
        } else {
            let dateDeadline = new Date(filteredTask[0].deadline)
            let dateSubmitted = new Date(filteredAssignment[0].submit_date)
            if (dateSubmitted === null || dateSubmitted > dateDeadline) {
                return false
            } else {
                return true
            }
        }
    }

    getEvaluation(id) {
        let filtered = this.state.submittedAssignments.filter(item => item.task_id === id)
        if (filtered.length !== 0) {
            return filtered[0].result.evaluation
        } else {
            return ''
        }
    }

    getComment(id) {
        let filtered = this.state.submittedAssignments.filter(item => item.task_id === id)
        if (filtered.length !== 0) {
            return filtered[0].result.comment
        } else {
            return ''
        }
    }

    getTaskResult(id) {
        return this.state.studentTasks.filter((task) => task.task_id === id)[0]
    }

    countPoints(data) {
        let counter = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i].result !== null) {
                counter = counter + data[i].result.evaluation
            }
        }
        return counter
    }

    getTypeInSlovak(type) {
        switch (type) {
            case 'first_check':
                return 'prvý zápočet';
            case 'second_check':
                return 'druhý zápočet';
            case 'semester_work':
                return 'semestrálna práca';
            default:
                return 'domáca úloha';
        }
    }

    getMaxNumberOfPoints(type) {
        switch (type) {
            case 'first_check':
                return '10';
            case 'second_check':
                return '30';
            case 'semester_work':
                return '50';
            default:
                return '10';
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <div style={{ color: 'white' }}>
                    <p></p>
                    <h3>Zoznam pridelených zadaní:</h3>
                    <br />
                    <h2 className="blog-post-title"> Kurz: {this.dayOfWeek(this.props.group.day)} - {this.props.group.time_begin}:00 </h2>
                    <p className="blog-post-meta"> Cvičiaci: {this.state.concreteTeacher.name} {this.state.concreteTeacher.surname} </p>
                </div>
                <div className="container">
                    <p style={{ color: 'white' }} className="d-flex justify-content-start"> <b> Body za semester: </b> </p>
                    <p style={{ color: 'white' }} className="d-flex justify-content-start"> <b> {this.countPoints(this.state.submittedAssignments)} / 100 </b> </p>
                    <table className="table table-bordered table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Názov</th>
                                <th scope="col">Typ</th>
                                <th scope="col">Deadline (D:H:M:S)</th>
                                <th scope="col">#</th>
                                <th scope="col">Stav</th>
                            </tr>
                        </thead>
                        <tbody className="table-secondary">
                            {this.state.studentTasks
                                .map((chosen) => {
                                    return (
                                        <tr key={chosen.task_id}>
                                            <td>{chosen.title}</td>
                                            <td>{this.getTypeInSlovak(chosen.type)}</td>

                                            {this.isSubmittedBeforeDeadline(chosen.task_id) && (
                                                <td className="table-success"> <Countdown date={Date.now() + this.timeBeforeDeadline(chosen.task_id)} /> </td>
                                            )}

                                            {!this.isSubmittedBeforeDeadline(chosen.task_id) && (
                                                <td className="table-danger"> <Countdown date={Date.now() + this.timeBeforeDeadline(chosen.task_id)} /> (po termíne) </td>
                                            )}

                                            {this.isEvaluated(chosen.task_id) && (
                                                <td><button className="btn btn-sm btn-info"
                                                    onClick={() =>
                                                        this.setState({
                                                            showModal: true,
                                                            comment: this.getComment(chosen.task_id),
                                                            evaluation: this.getEvaluation(chosen.task_id),
                                                            taskResult: this.getTaskResult(chosen.task_id),
                                                        })
                                                    }> Výsledok</button></td>
                                            )}

                                            {!this.isEvaluated(chosen.task_id) && !this.isSubmitted(chosen.task_id) && (
                                                <td><button onClick={() => this.onClick(chosen.task_id)} className="btn btn-sm btn-info">Zobraziť</button></td>
                                            )}
                                            {!this.isEvaluated(chosen.task_id) && this.isSubmitted(chosen.task_id) && (
                                                <td><button onClick={() => this.onClick(chosen.task_id)} className="btn btn-sm btn-info">Upraviť</button></td>
                                            )}

                                            {this.isEvaluated(chosen.task_id) && (
                                                <td className="table-success">Hodnotené</td>
                                            )}
                                            {this.isSubmitted(chosen.task_id) && !this.isEvaluated(chosen.task_id) && (
                                                <td className="table-warning">Odovzdané</td>
                                            )}
                                            {!this.isSubmitted(chosen.task_id) && !this.isEvaluated(chosen.task_id) && (
                                                <td className="table-danger">Neodovzdané</td>
                                            )}
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>

                <Modal
                    show={this.state.showModal}
                    onHide={() =>
                        this.setState({
                            showModal: false,
                        })
                    }
                >
                    <Modal.Header>
                        <Modal.Title> {this.state.taskResult.title} -  
                         ({this.getTypeInSlovak(this.state.taskResult.type)})</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h5> Hodnotenie: </h5>
                        <br></br>
                        <p> <u>Počet bodov:</u> <b>{this.state.evaluation}</b> / {this.getMaxNumberOfPoints(this.state.taskResult.type)} </p>
                        <p> <u>Komentár:</u> <b>{this.state.comment}</b> </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <button
                            className="btn btn-sm btn-info"
                            onClick={() =>
                                this.setState({
                                    showModal: false,
                                })
                            }
                        >
                            Zavrieť
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default StudentTasks

