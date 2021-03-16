import React, { Component } from 'react'
import Navigation from '../Navigation'
import { withRouter } from 'react-router-dom'

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

        //console.log(this.state.id)
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
        } else {
            this.props
                .onSubmit(dataTask)
                .then(() => {
                    this.props.history.push('/myTasks')
                })
        }
        // if (this.props.match.params.id != null)
        // {
        //     getApiResponse('tasks/' + this.state.id, 'put', {
        //         type: this.state.type,
        //         content: this.state.content,
        //         deadline: this.state.deadline,
        //     })
        //     .then(() => {
        //         this.props.history.push('/')
        //     })
        // } else {
        //     getApiResponse('tasks/store', 'post', {
        //         type: this.state.type,
        //         content: this.state.content,
        //         deadline: this.state.deadline,
        //     })
        //     .then(() => {
        //         this.props.history.push('/')
        //     })
        // }


        //   .catch((e) => {
        //     this.setState({
        //       nameErrors: e.response.data['name'] || [],
        //       phoneErrors: e.response.data['phone'] || [],
        //       emailErrors: e.response.data['email'] || [],
        //       passwordErrors: e.response.data['password'] || [],
        //     })
        //   })
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
                                <label for="type">Typ zadania</label>
                                <select type="text" class="form-control" id="type" name="type" value={this.state.type} onChange={this.typeChanged} required>
                                    {/* <option value={this.state.type}>{this.state.type}</option>  */}
                                    <option value=""></option>
                                    <option value="first_check">Prvý zápočet</option>
                                    <option value="second_check">Druhý zápočet</option>
                                    <option value="semester_work">Semestrálna práca</option>
                                    <option value="homework">Domáca úloha</option>
                                </select>
                                <label for="title">Názov</label>
                                <input type="text" className="form-control"
                                    id="title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.titleChanged}
                                />
                                <label for="type">Popis</label>
                                <textarea type="text" className="form-control"
                                    id="content"
                                    name="content"
                                    value={this.state.content}
                                    onChange={this.contentChanged}
                                    required>
                                </textarea>
                                <label for="type">Deadline</label>
                                <input type="date" className="form-control" placeholder="Deadline"
                                    id="deadline"
                                    name="deadline"
                                    value={this.state.deadline}
                                    onChange={this.deadlineChanged}
                                />
                                {(this.props.match.params.id == null) && (
                                    <div>
                                        <label for="filename">Priložiť súbor</label>
                                        <input type="file" className="form-control"
                                            name="filename"
                                            id="filename"
                                            onChange={this.fileChanged}
                                        />
                                    </div>
                                )}
                                {/* {getAllErrors(this.state.passwordErrors)} */}
                                <p></p>
                                <button className="w-50 btn btn-lg btn-primary" type="submit">Ulož</button>
                                <p></p>
                                {/* <p className="mt-5 mb-3 text-muted">&copy; since 2021</p> */}
                            </form>

                            {(this.props.match.params.id != null) && (
                                <div>
                                    <label for="filename">Zmeniť súbor</label>
                                    <p>{this.state.path_to_file}</p>
                                    <input type="file" className="form-control"
                                        name="filename"
                                        id="filename"
                                        onChange={this.fileUpdated}
                                    />
                                    <p></p>
                                    <button onClick={() => this.onUpdate()} 
                                    className="w-50 btn btn-lg btn-primary" type="submit">Zmeň súbor
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