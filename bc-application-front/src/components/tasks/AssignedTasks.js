import React, { Component } from 'react'
import Navigation from '../Navigation'
import dateFormat from 'dateformat';

class AssignedTasks extends Component {
    constructor(props) {
        super(props)

        let task = this.props.tasks.filter(
            (item) => item.task_id === parseInt(this.props.match.params.id)
        )[0]

        let students = []

        for (let j = 0; j < this.props.users.length; j++) {
            const item1 = this.props.users[j]
            for (let k = 0; k < this.props.users[j].stud_tasks.length; k++) {
                const item2 = this.props.users[j].stud_tasks[k]
                if (item2.task_id === task.task_id) {
                    students.push(item1)
                }
            }
        }


        this.state = {
            concreteTask: task,
            assignedStudents: students,
        }

        this.onRemove = this.onRemove.bind(this)
        this.onDisplay = this.onDisplay.bind(this)
    }

    toDate(time) {
        return dateFormat(time, "d.mm.yyyy")
    }

    isSubmitted(array) {
        let temp = array.filter(item => item.task_id == this.props.match.params.id)
        return temp.length !== 0
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
    }

    onDisplay(array) {
        let chosen_assignment = array.filter(item => item.task_id == this.props.match.params.id)
        this.props.history.push('/evaluate/' + this.props.match.params.id + '/assignment/' + chosen_assignment[0].assignment_id)
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
                <p> {this.state.concreteTask.content} </p>
                </div>
                <div className="container">
                    <p></p>
                    <table className="table table-hover table-bordered table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Študent</th>
                                <th scope="col">Skupina</th>
                                <th scope="col">Stav</th>
                                <th scope="col">Odobrať</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody className="table-secondary">
                            {this.state.assignedStudents
                                .map((chosen) => {
                                    return (
                                        <tr key={chosen.user_id}>
                                            <td>{chosen.name} {chosen.surname}</td>
                                            <td>{chosen.group}</td>
                                            { this.isSubmitted(chosen.submitted_assignments) && (
                                            <td className="table-success">Odovzdané</td>
                                            )} 
                                            { !this.isSubmitted(chosen.submitted_assignments) && (
                                            <td className="table-danger">Neodovzdané</td>
                                            )} 
                                            <td onClick={() => this.onRemove(chosen.user_id)}> <button className="btn-dark"> x </button> </td>
                                            { this.isSubmitted(chosen.submitted_assignments) && (
                                            <td onClick={() => this.onDisplay(chosen.submitted_assignments)}> <button className="btn-dark"> Ohodnoť </button> </td>
                                            )}
                                            {!this.isSubmitted(chosen.submitted_assignments) && (
                                            <td></td>
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

export default AssignedTasks

