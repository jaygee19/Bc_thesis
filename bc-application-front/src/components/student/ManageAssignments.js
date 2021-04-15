import React, { Component } from 'react'
import Navigation from '../Navigation'
import dateFormat from 'dateformat';
import bsCustomFileInput from 'bs-custom-file-input';
import { getAllErrors } from '../../helpers/ErrorHelper'

class ManageAssignments extends Component {
    constructor(props) {
        super(props)

        let task = this.props.user.stud_tasks.filter(t => t.task_id == this.props.match.params.id)
        let sub = this.props.user.submitted_assignments.filter(s => s.task_id == this.props.match.params.id)

        this.state = {
            path_to_file: '',
            file_name: '',
            concreteTask: task[0],
            concreteAssignments: sub,
            ip_address: '',
            statusErrors: [],
            ipErrors: [],
            fileErrors: [],
        }


        this.fileChanged = this.fileChanged.bind(this)
        this.ipAddressChanged = this.ipAddressChanged.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
    }

    componentDidMount() {
        bsCustomFileInput.init()
    }

    toDate(time) {
        return dateFormat(time, "d.mm.yyyy, h:MM")
    }

    fileChanged(event) {
        this.setState({
            path_to_file: event.target.files[0],
            file_name: event.target.value,
        })
    }

    ipAddressChanged(event) {
        this.setState({
            ip_address: event.target.value,
        })
    }

    showAssignment(path) {
        return 'http://127.0.0.1:8000/storage' + path
    }

    onUpdate() {

        const dataTask = new FormData();
        dataTask.append('filename', this.state.path_to_file);
        dataTask.append('assignment_id', this.state.concreteAssignments[0].assignment_id);
        dataTask.append('name', this.state.file_name);

        this.props.onUpdate(dataTask)
            .then(() => {
                this.props.history.push('/studentTasks')
            })
            .catch((e) => {
                this.setState({
                    statusErrors: e.response.data['status'] || [],
                    fileErrors: e.response.data['filename'] || [],
                })
            })

    }

    onSubmit(event) {
        event.preventDefault()

        const dataTask = new FormData();
        dataTask.append('filename', this.state.path_to_file);
        dataTask.append('task_id', this.state.concreteTask.task_id);
        dataTask.append('ip_address', this.state.ip_address);
        dataTask.append('name', this.state.file_name);


        for (var key of dataTask.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }


        this.props.onSubmit(dataTask)
            .then(() => {
                this.props.history.push('/studentTasks')
            })
            .catch((e) => {
                this.setState({
                    statusErrors: e.response.data['status'] || [],
                    ipErrors: e.response.data['ip_address'] || [],
                    fileErrors: e.response.data['filename'] || [],
                })
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
                            <a className="btn btn-lg btn-dark" href={this.showAssignment(this.state.concreteTask.path_to_file.substr(6))} target="_blank" download>Zobraz zadanie  &raquo;</a>
                        )}

                        {(this.state.concreteAssignments.length === 0) && (
                            <div>
                                <form onSubmit={this.onSubmit}>
                                    <p></p>
                                    <label>IP adresa</label>
                                    <input type="text" className="form-control"
                                        id="ip_address"
                                        name="ip_address"
                                        value={this.state.ip_address}
                                        onChange={this.ipAddressChanged}
                                        required
                                    />
                                    {getAllErrors(this.state.ipErrors)}
                                    <p></p>
                                    <label>Priložiť súbor</label>
                                    <div className="custom-file">
                                        <input id="inputGroupFile01" type="file" className="custom-file-input"
                                            name="filename"
                                            id="filename"
                                            onChange={this.fileChanged}
                                            required
                                        />
                                        <label className="custom-file-label">Choose file</label>
                                    </div>
                                    {getAllErrors(this.state.fileErrors)}
                                    {getAllErrors(this.state.statusErrors)}
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
                                {this.state.concreteAssignments[0].file_name !== null && (
                                <p>Zadanie: <a href={this.showAssignment(this.state.concreteAssignments[0].path_to_file.substr(6))} target="_blank" download>
                                    {this.state.concreteAssignments[0].file_name.substr(12)}
                                </a></p>
                                )}
                                <p></p>

                                <div className="custom-file">
                                    <input id="inputGroupFile01" type="file" className="custom-file-input"
                                        name="filename"
                                        id="filename"
                                        onChange={this.fileChanged}
                                        required
                                    />
                                    <label className="custom-file-label">Choose file</label>
                                </div>
                                {getAllErrors(this.state.fileErrors)}
                                {getAllErrors(this.state.statusErrors)}
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
