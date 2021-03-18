import React, { Component } from 'react'
import Navigation from '../Navigation'
import dateFormat from 'dateformat';


class ManageAssignments extends Component {
    constructor(props) {
        super(props)

        let task = this.props.user.stud_tasks.filter(t => t.task_id == this.props.match.params.id)
        let sub = this.props.user.submitted_assignments.filter(s => s.task_id == this.props.match.params.id)

        this.state = {
            path_to_file: '',
            concreteTask: task[0],
            concreteAssignments: sub,
            ip_adress: '',
        }


        this.fileChanged = this.fileChanged.bind(this)
        this.ipAdressChanged = this.ipAdressChanged.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
    }

    toDate(time) {
        return dateFormat(time, "d.mm.yyyy")
    }

    fileChanged(event) {
        this.setState({
            path_to_file: event.target.files[0],
        })
    }

    ipAdressChanged(event) {
        this.setState({
            ip_adress: event.target.value,
        })
    }

    onUpdate() {

        const dataTask = new FormData();
        dataTask.append('filename', this.state.path_to_file);
        dataTask.append('assignment_id', this.state.concreteAssignments[0].assignment_id);

        this.props.onUpdate(dataTask)
        .then(() => {
            this.props.history.push('/studentTasks')
        })
    }

    onSubmit(event) {
        event.preventDefault()

        const dataTask = new FormData();
        dataTask.append('filename', this.state.path_to_file);
        dataTask.append('task_id', this.state.concreteTask.task_id);
        dataTask.append('ip_adress', this.state.ip_adress);


        for (var key of dataTask.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }


        this.props.onSubmit(dataTask)
            .then(() => {
                this.props.history.push('/studentTasks')
            })
    }

    render() {
        return (
            <div>
                <Navigation />
                <p></p>
                <div className="container">
                    <div className="jumbotron bg-white">
                        <h1>{this.state.concreteTask.title}</h1>
                        <p className="lead">{this.state.concreteTask.content}</p>
                        <p className="lead">Deadline: {this.toDate(this.state.concreteTask.deadline)}</p>
                        {this.state.concreteTask.path_to_file !== null && (
                            <a className="btn btn-lg btn-dark" href={this.state.concreteTask.path_to_file} role="button">Zobraz zadanie  &raquo;</a>
                        )}

                        {(this.state.concreteAssignments.length === 0) && (
                            <div>
                                <form onSubmit={this.onSubmit}>
                                    <p></p>
                                    <label>IP adresa</label>
                                    <input type="text" className="form-control"
                                        id="ip_adress"
                                        name="ip_adress"
                                        value={this.state.ip_adress}
                                        onChange={this.ipAdressChanged}
                                    />
                                    <p></p>
                                    <label>Priložiť súbor</label>
                                    <input type="file" className="form-control"
                                        name="filename"
                                        id="filename"
                                        onChange={this.fileChanged}
                                    />
                                    <p></p>
                                    <button className="w-50 btn btn-lg btn-dark" type="submit">Ulož</button>
                                    <p></p>
                                </form>
                            </div>
                        )}



                        {(this.state.concreteAssignments.length !== 0) && (
                            <div>
                                <p></p>
                                <label>Zmeniť súbor</label>
                                <p>{this.state.concreteAssignments[0].path_to_file}</p>
                                <input type="file" className="form-control"
                                    name="filename"
                                    id="filename"
                                    onChange={this.fileChanged}
                                />
                                <p></p>
                                <button onClick={() => this.onUpdate()}
                                    className="w-50 btn btn-lg btn-dark" type="submit">Zmeň súbor
                                </button>
                                <p></p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        )
    }
}

export default ManageAssignments
