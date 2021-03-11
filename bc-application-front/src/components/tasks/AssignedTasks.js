import userEvent from '@testing-library/user-event'
import React, { Component } from 'react'
import Navigation from '../Navigation'

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


    render() {
        return (
            <div>
                <Navigation />
                <p></p>
                <h3>Zoznam pridelených študentov:</h3>
                <br />
                <h2 className="blog-post-title">{this.state.concreteTask.title}</h2>
                <p className="blog-post-meta"> Deadline: {this.state.concreteTask.deadline}</p>
                <p> {this.state.concreteTask.content} </p>
                <div className="container">
                    <p></p>
                    <table class="table table-hover table-bordered table-sm">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Študent</th>
                                <th scope="col">Skupina</th>
                                <th scope="col">Stav</th>
                                <th scope="col">Odobrať</th>
                            </tr>
                        </thead>
                        <tbody className="table-secondary">
                            {this.state.assignedStudents
                                .map((chosen) => {
                                    return (
                                        <tr>
                                            <td>{chosen.name} {chosen.surname}</td>
                                            <td>{chosen.group}</td>
                                            <td className="table-danger"></td>
                                            <td onClick={() => this.onRemove(chosen.user_id)}> <button> x </button> </td>
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

