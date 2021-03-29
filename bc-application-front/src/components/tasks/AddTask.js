import React, { Component } from 'react'
import Navigation from '../Navigation'
import { withRouter } from 'react-router-dom'
import bsCustomFileInput from 'bs-custom-file-input';
import { getAllErrors } from '../../helpers/ErrorHelper'

class AddTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            type: '',
            title: '',
            content: '',
            deadline: '',
            path_to_file: '',
            path_to_file_updated: '',
            statusErrors: [],
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.typeChanged = this.typeChanged.bind(this)
        this.titleChanged = this.titleChanged.bind(this)
        this.contentChanged = this.contentChanged.bind(this)
        this.deadlineChanged = this.deadlineChanged.bind(this)
        this.fileChanged = this.fileChanged.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.fileUpdated = this.fileUpdated.bind(this)

        if (this.props.match.params.id != null) {
            let task = this.props.tasks.filter(
                (item) => item.task_id === parseInt(this.props.match.params.id)
            )[0]
            this.state = {
                id: task.task_id,
                type: task.type,
                title: task.title,
                content: task.content,
                deadline: task.deadline,
                path_to_file: task.path_to_file,
            }
        }
    }

    
    componentDidMount() {
        bsCustomFileInput.init()
    }

    typeChanged(event) {
        this.setState({
            type: event.target.value,
        })
    }

    titleChanged(event) {
        this.setState({
            title: event.target.value,
        })
    }

    contentChanged(event) {
        this.setState({
            content: event.target.value,
        })
    }

    deadlineChanged(event) {
        this.setState({
            deadline: event.target.value,
        })
    }

    fileChanged(event) {
        this.setState({
            path_to_file: event.target.files[0],
        })
    }

    fileUpdated(event) {
        this.setState({
            path_to_file_updated: event.target.files[0],
        })
    }

    onUpdate() {
        const dataTask = new FormData();
        dataTask.append('filename', this.state.path_to_file_updated);
        dataTask.append('id', this.props.match.params.id);

        this.props.onUpdate(dataTask)
            .then(() => {
                this.props.history.push('/myTasks')
            })
    }

    onSubmit(event) {
        event.preventDefault()

        const dataTask = new FormData();
        dataTask.append('filename', this.state.path_to_file);
        dataTask.append('type', this.state.type);
        dataTask.append('title', this.state.title);
        dataTask.append('content', this.state.content);
        dataTask.append('deadline', this.state.deadline);

        for (var key of dataTask.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }

        if (this.props.match.params.id != null) {
            this.props
                .onSubmit({
                    task_id: this.state.id,
                    type: this.state.type,
                    title: this.state.title,
                    content: this.state.content,
                    deadline: this.state.deadline,
                })
                .then(() => {
                    this.props.history.push('/myTasks')
                })
                .catch((e) => {
                    this.setState({
                        statusErrors: e.response.data['status'] || [],
                    })
                })
        } else {
            this.props
                .onSubmit(dataTask)
                .then(() => {
                    this.props.history.push('/myTasks')
                })
                .catch((e) => {
                    this.setState({
                        statusErrors: e.response.data['status'] || [],
                    })
                })
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="container col-md-6">
                    <p></p>
                    <div className="card login-card">
                        <h3>Uprav zadanie:</h3>
                        <p></p>
                        <div className="justify-content-center align-items-center">
                            <form onSubmit={this.onSubmit} encType="multipart/form-data">
                                <label>Typ zadania</label>
                                <select type="text" className="form-control" id="type" name="type" value={this.state.type} onChange={this.typeChanged} required>
                                    <option value=""></option>
                                    <option value="first_check">Prvý zápočet</option>
                                    <option value="second_check">Druhý zápočet</option>
                                    <option value="semester_work">Semestrálna práca</option>
                                    <option value="homework">Domáca úloha</option>
                                </select>
                                <label>Názov</label>
                                <input type="text" className="form-control"
                                    id="title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.titleChanged}
                                />
                                <label>Popis</label>
                                <textarea type="text" className="form-control"
                                    id="content"
                                    name="content"
                                    value={this.state.content}
                                    onChange={this.contentChanged}
                                    required>
                                </textarea>
                                <label>Deadline</label>
                                <input type="datetime-local" className="form-control" placeholder="Deadline"
                                    id="deadline"
                                    name="deadline"
                                    value={this.state.deadline}
                                    onChange={this.deadlineChanged}
                                />
                                {(this.props.match.params.id == null) && (
                                    <div>
                                        <label>Priložiť súbor</label>
                                        <div className="custom-file">
                                            <input id="inputGroupFile01" type="file" className="custom-file-input" 
                                            name="filename"
                                            id="filename"
                                            onChange={this.fileChanged}
                                            />
                                            <label className="custom-file-label">Choose file</label>
                                        </div>
                                    </div>
                                )}
                                {getAllErrors(this.state.statusErrors)} 
                                <p></p>
                                <button className="w-50 btn btn-lg btn-dark" type="submit">Ulož</button>
                                <p></p>
                            </form>

                            {(this.props.match.params.id != null) && (
                                <div>
                                    <label>Zmeniť súbor</label>
                                    <p>{this.state.path_to_file}</p>
                                    
                                    <div className="custom-file">
                                            <input id="inputGroupFile01" type="file" className="custom-file-input" 
                                            name="filename"
                                            id="filename"
                                            onChange={this.fileUpdated}
                                            />
                                            <label className="custom-file-label">Choose file</label>
                                        </div>

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
            </div>
        )
    }
}

export default withRouter(AddTask);