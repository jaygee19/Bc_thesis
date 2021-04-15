import React, { Component } from 'react'
import Navigation from '../Navigation'
import Task from './Task';
import { withRouter } from 'react-router-dom'
import AuthHelper from '../../helpers/AuthHelper'
import Modal from 'react-bootstrap/Modal'


class MyTasks extends Component {
    constructor(props) {
        super(props)

        if (this.props.status != 0) {
            this.state = {
                showModal: true,
                value: this.props.status,
            }
        } else {
            this.state = {
                showModal: false,
            }
        }

        this.props.resetStatus()

        this.onAddNew = this.onAddNew.bind(this)
    }

    onAddNew(event) {
        event.preventDefault()
        this.props.history.push('/myTasks/create')
    }

    getUserName(id) {
        let concreteUser = this.props.users.filter(item => item.user_id === id)
        let fullName = concreteUser[0].name + " " + concreteUser[0].surname
        return fullName
    }

    render() {
        console.log("Aktualny status", this.props.status)
        return (
            <div>
                <Navigation />
                <div className="container">
                    <p></p>
                    <button onClick={this.onAddNew} type="submit" className="btn btn-light" > Nové zadanie + </button>
                    <p></p>
                    <div className="d-flex justify-content-start" style={{ color: 'white' }}>
                        <h3> {this.getUserName(AuthHelper.getInstance().getUserID())} :</h3>
                    </div>
                    <p></p>
                </div>
                {this.props.tasks.filter((task) => task.hidden !== true)
                    .map((task) => {
                        return (
                            <Task
                                key={task.task_id}
                                id={task.task_id}
                                content={task.content}
                                userName={this.getUserName(task.teacher_id)}
                                title={task.title}
                                date={task.valid_from}
                                deadline={task.deadline}
                                type={task.type}
                                path={task.path_to_file}
                                onHide={this.props.hideTask}
                                private={true}
                                hidden={task.hidden}
                            />
                        )
                    })}

                <Modal
                    show={this.state.showModal}
                    onHide={() =>
                        this.setState({
                            showModal: false,
                        })
                    }
                >
                    <Modal.Header>
                        <Modal.Title>Notifikácia</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.state.value === 1 && (
                            <p className="table-success">Zadanie bolo úspešne pridané</p>
                        )}
                        {this.state.value === 2 && (
                            <p className="table-warning">Zadanie bolo úspešne modifikované</p>
                        )}
                        {this.state.value === 3 && (
                            <p className="table-danger">Zadanie bolo úspešne zmazané</p>
                        )}
                    </Modal.Body>

                    <Modal.Footer>
                        <button
                            className="btn btn-sm btn-dark"
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

export default withRouter(MyTasks);