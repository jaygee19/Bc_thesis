import React, { Component } from 'react'
import AuthHelper from '../../helpers/AuthHelper'
import Navigation from '../Navigation'

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
        }
    }

    dayOfWeek(dayIndex) {
        return ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"][dayIndex] || '';
    }

    isSubmitted(id) {
        let temp = this.state.submittedAssignments.filter(s => s.task_id === id)
        return temp.length !== 0
    }

    render() {
        console.log("USER", this.state.submittedAssignments)
        return (
            <div>
                <Navigation />
                <p></p>
                <h3>Zoznam pridelených zadaní:</h3>
                <br />
                <h2 className="blog-post-title"> Kurz: {this.dayOfWeek(this.props.group.day)} - {this.props.group.time_begin}:00 </h2>
                <p className="blog-post-meta"> Cvičiaci: {this.state.concreteTeacher.name} {this.state.concreteTeacher.surname} </p>
                <div className="container">
                    <p></p>
                    
                    <table className="table table-hover table-bordered table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Názov</th>
                                <th scope="col">Typ</th>
                                <th scope="col">Deadline</th>
                                <th scope="col-1">#</th>
                                <th scope="col">Stav</th>
                            </tr>
                        </thead>
                        <tbody className="table-secondary">
                            {this.state.studentTasks
                                .map((chosen) => {
                                    return (
                                        <tr key={chosen.task_id}>
                                            <td>{chosen.title}</td>
                                            <td>{chosen.type}</td>
                                            <td>{chosen.deadline}</td>
                                            <td><a href={chosen.path_to_file}>Zobraz</a></td>
                                            {this.isSubmitted(chosen.task_id) && (
                                            <td className="table-warning">Odovzdané</td>
                                            )}
                                            {!this.isSubmitted(chosen.task_id) && (
                                            <td className="table-danger">Neodovzdané</td>
                                            )}
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default StudentTasks

