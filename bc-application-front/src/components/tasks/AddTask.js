import React, { Component } from 'react'
import Navigation from '../Navigation'
import { getApiResponse } from '../../helpers/ApiHelper'
import { Redirect, withRouter } from 'react-router-dom'

class AddTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            type: '',
            content: '',
            deadline: '',
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.typeChanged = this.typeChanged.bind(this)
        this.contentChanged = this.contentChanged.bind(this)
        this.deadlineChanged = this.deadlineChanged.bind(this)

        if (this.props.match.params.id != null) {
            let task = this.props.tasks.filter(
                (item) => item.task_id === parseInt(this.props.match.params.id)
            )[0]
            this.state = {
                id: task.task_id,
                type: task.type,
                content: task.content,
                deadline: task.deadline,
            }
        }

        //console.log(this.state.id)
    }

    typeChanged(event) {
        this.setState({
            type: event.target.value,
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

    onSubmit(event) {
        event.preventDefault()

        if (this.props.match.params.id != null) {
            this.props
                .onSubmit({
                    task_id: this.state.id,
                    type: this.state.type,
                    content: this.state.content,
                    deadline: this.state.deadline,
                })
                .then(() => {
                    this.props.history.push('/myTasks')
                })
        } else {
            this.props
                .onSubmit({
                    type: this.state.type,
                    content: this.state.content,
                    deadline: this.state.deadline,
                })
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
                    <form onSubmit={this.onSubmit}>
                        <label for="type">Typ zadania</label>
                        <select type="text" class="form-control" id="type" name="type" value={this.state.type} onChange={this.typeChanged} required>
                            {/* <option value={this.state.type}>{this.state.type}</option>  */}
                            <option value=""></option>
                            <option value="first_check">Prvý zápočet</option>
                            <option value="second_check">Druhý zápočet</option>
                            <option value="semester_work">Semestrálna práca</option>
                            <option value="homework">Domáca úloha</option>
                        </select>
                        {/* <input type="text" className="form-control" placeholder="Type"
                            id="type"
                            name="type"
                            value={this.state.type}
                            onChange={this.typeChanged}
                        /> */}
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
                        {/* {getAllErrors(this.state.passwordErrors)} */}
                        <p></p>
                        <button className="w-50 btn btn-lg btn-primary" type="submit">Ulož</button>
                        <p></p>
                        {/* <p className="mt-5 mb-3 text-muted">&copy; since 2021</p> */}
                    </form>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AddTask);