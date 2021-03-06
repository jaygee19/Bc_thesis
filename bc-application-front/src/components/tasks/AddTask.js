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
            file_name: '',
            canBeDeleted: false,
            status_errors: [],
            type_errors: [],
            title_errors: [],
            content_errors: [],
            deadline_errors: [],
            file_errors: [],
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.typeChanged = this.typeChanged.bind(this)
        this.titleChanged = this.titleChanged.bind(this)
        this.contentChanged = this.contentChanged.bind(this)
        this.deadlineChanged = this.deadlineChanged.bind(this)
        this.fileChanged = this.fileChanged.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.fileUpdated = this.fileUpdated.bind(this)

        if ((this.props.match.params.id) != null) {
            let task = this.props.tasks.filter((item) => item.task_id === parseInt(this.props.match.params.id))[0]
            if (task.stud_tasks.length === 0) {
                this.state = {
                    id: task.task_id,
                    type: task.type,
                    title: task.title,
                    content: task.content,
                    deadline: task.deadline,
                    path_to_file: task.path_to_file,
                    file_name: task.file_name,
                    file_name_const: task.file_name,
                    canBeDeleted: true
                }
            } else {
                this.state = {
                    id: task.task_id,
                    type: task.type,
                    title: task.title,
                    content: task.content,
                    deadline: task.deadline,
                    path_to_file: task.path_to_file,
                    file_name: task.file_name,
                    file_name_const: task.file_name,
                    canBeDeleted: false
                }
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
            file_name: event.target.value,
        })
    }

    fileUpdated(event) {
        this.setState({
            path_to_file_updated: event.target.files[0],
            file_name: event.target.value,
        })
    }

    showTask(path) {
        return 'http://127.0.0.1:8000/storage' + path
    }

    onDelete(id) {
        this.props.onDelete(id)
            .then(() => {
                this.props.history.push('/myTasks')
            })
    }

    onUpdate() {
        const dataTask = new FormData();
        if (this.state.path_to_file_updated === undefined) {
            dataTask.append('filename', '')
        } else {
            dataTask.append('filename', this.state.path_to_file_updated)
        }
        dataTask.append('id', this.props.match.params.id)
        dataTask.append('name', this.state.file_name)

        this.props.onUpdate(dataTask)
            .then(() => {
                this.props.history.push('/myTasks')
            })
            .catch((e) => {
                this.setState({
                    status_errors: e.response.data['status'] || [],
                    file_errors: e.response.data['filename'] || [],
                })
            })
    }

    onSubmit(event) {
        event.preventDefault()

        const dataTask = new FormData()
        dataTask.append('filename', this.state.path_to_file)
        dataTask.append('type', this.state.type)
        dataTask.append('title', this.state.title)
        dataTask.append('content', this.state.content)
        dataTask.append('deadline', this.state.deadline)
        dataTask.append('name', this.state.file_name)

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
                        status_errors: e.response.data['status'] || [],
                        type_errors: e.response.data['type'] || [],
                        title_errors: e.response.data['title'] || [],
                        content_errors: e.response.data['content'] || [],
                        deadline_errors: e.response.data['deadline'] || [],
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
                        status_errors: e.response.data['status'] || [],
                        type_errors: e.response.data['type'] || [],
                        title_errors: e.response.data['title'] || [],
                        content_errors: e.response.data['content'] || [],
                        deadline_errors: e.response.data['deadline'] || [],
                    })
                })
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="container borders" style={{ color: 'white' }}>
                    <div className="col-md-12">
                        <br/>
                        {(this.props.match.params.id != null) && (
                            <div className="d-flex justify-content-center ">
                                <h3>Uprav zadanie:</h3>
                            </div>
                        )}
                        {this.state.canBeDeleted && (
                            <div className="d-flex justify-content-center ">
                                <button onClick={() => this.onDelete(this.state.id)} type="submit" className="my_btn btn btn-info btn-bg" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        {(this.props.match.params.id == null) && (
                            <h3>Vytvor zadanie:</h3>
                        )}
                        <p></p>

                        <div className="justify-content-center align-items-center">
                            <p className="d-flex justify-content-start"><small>* tieto údaje sú povinné </small></p>
                            <br />
                            <form onSubmit={this.onSubmit} encType="multipart/form-data">
                                <label className="d-flex justify-content-start"> <b> Typ zadania: </b> * </label>
                                <select type="text" className="form-control col-3" id="type" name="type" value={this.state.type} onChange={this.typeChanged} required>
                                    <option value=""></option>
                                    <option value="first_check">Prvý zápočet</option>
                                    <option value="second_check">Druhý zápočet</option>
                                    <option value="semester_work">Semestrálna práca</option>
                                    <option value="homework">Domáca úloha</option>
                                </select>
                                {getAllErrors(this.state.type_errors)}
                                <p></p>
                                <label className="d-flex justify-content-start"> <b> Názov: </b> * </label>
                                <input type="text" className="form-control col-6"
                                    id="title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.titleChanged}
                                    required
                                />
                                {getAllErrors(this.state.title_errors)}
                                <p></p>
                                <label className="d-flex justify-content-start"> <b> Popis: </b> *</label>
                                <textarea type="text" className="form-control"
                                    id="content"
                                    name="content"
                                    value={this.state.content}
                                    onChange={this.contentChanged}
                                    required>
                                </textarea>
                                {getAllErrors(this.state.content_errors)}
                                <p></p>
                                <label className="d-flex justify-content-start"> <b> Deadline: </b> *</label>
                                <input type="datetime-local" className="form-control col-6" placeholder="Deadline"
                                    id="deadline"
                                    name="deadline"
                                    value={this.state.deadline}
                                    onChange={this.deadlineChanged}
                                    required
                                />
                                {getAllErrors(this.state.deadline_errors)}
                                {(this.props.match.params.id == null) && (
                                    <div>
                                        <p></p>
                                        <label className="d-flex justify-content-start"> <b> Priložiť súbor: </b></label>
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

                                {getAllErrors(this.state.status_errors)}
                                <p></p>
                                <button className="w-50 btn btn-lg btn-info btn-bg" type="submit">Ulož</button>
                                <p></p>
                            </form>

                            {(this.props.match.params.id != null) && (
                                <div>
                                    <label> <b> Zmeniť súbor: </b> </label>
                                    <br />
                                    {(this.state.path_to_file !== null) && (
                                        <a href={this.showTask(this.state.path_to_file.substr(6))} target="_blank" download>
                                            {this.state.file_name_const.substr(12)}
                                        </a>
                                    )}
                                    <p></p>

                                    <div className="custom-file">
                                        <input id="inputGroupFile01" type="file" className="custom-file-input"
                                            name="filename"
                                            id="filename"
                                            onChange={this.fileUpdated}
                                            required
                                        />
                                        <label className="custom-file-label">Choose file</label>
                                    </div>

                                    {getAllErrors(this.state.status_errors)}
                                    {getAllErrors(this.state.file_errors)}
                                    <p></p>
                                    <button onClick={() => this.onUpdate()}
                                        className="w-50 btn btn-lg btn-info btn-bg" type="submit">Zmeň súbor
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