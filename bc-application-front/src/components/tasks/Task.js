import { React, Component } from 'react'
import { withRouter } from 'react-router-dom'
import AuthHelper from '../../helpers/AuthHelper'
import dateFormat from 'dateformat';
import Card from 'react-bootstrap/Card';
import { Container, CardGroup } from 'react-bootstrap';
import { getAllErrors } from '../../helpers/ErrorHelper'

class Task extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: new Date(Date()),
            statusErrors: [],
        }

        this.onEdit = this.onEdit.bind(this)
        this.onAssign = this.onAssign.bind(this)
        this.onListOf = this.onListOf.bind(this)
        this.onHide = this.onHide.bind(this)
        this.onUncover = this.onUncover.bind(this)
    }

    toDate(time) {
        if (time !== null) {
            return dateFormat(time, "d.mm.yyyy, HH:MM ")
        }
    }

    compareDates(data) {
        let dateDeadline = new Date(data)
        let today = new Date(Date())
        return today < dateDeadline
    }

    onAssign() {
        this.props.history.push('/assignTasks/' + this.props.id)
    }

    onEdit() {
        this.props.history.push('/myTasks/' + this.props.id + '/edit')
    }

    onListOf() {
        this.props.history.push('/assignedTasks/' + this.props.id)
    }

    onHide(id) {
        this.props.onHide(id)
            .catch((e) => {
                this.setState({
                    statusErrors: e.response.data['status'] || [],
                })
            })
    }

    onUncover(id) {
        this.props.onUncover(id)
            .catch((e) => {
                this.setState({
                    statusErrors: e.response.data['status'] || [],
                })
            })
    }

    render() {
        return (
            <Card key={this.props.key}>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.type}</Card.Subtitle>
                    <Card.Text>
                        <div className="mb-1 text-muted"><small><u> Autor:</u> ( {this.props.userName} {this.props.userSurname} )</small></div>
                        {!this.compareDates(this.props.deadline) && (
                            <div className="mb-1 text-dark list-group-item-warning">
                                DEADLINE : {this.toDate(this.props.deadline)}</div>
                        )}
                        {this.compareDates(this.props.deadline) && (
                            <div className="mb-1 text-muted">
                                DEADLINE : {this.toDate(this.props.deadline)}</div>
                        )}
                        <hr style={{ color: 'grey' }} />

                    </Card.Text>
                    <div>
                        {AuthHelper.getInstance().isUserTeacher() && this.props.private && this.props.hidden !== true && (
                            <button onClick={this.onEdit} type="submit" className="my_btn btn btn-info" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                </svg>
                            </button>
                        )}
                        {AuthHelper.getInstance().isUserTeacher() && this.props.private && this.props.hidden !== true && (
                            <button onClick={this.onAssign} type="submit" className="my_btn btn btn-info" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                </svg>
                            </button>
                        )}
                        {AuthHelper.getInstance().isUserTeacher() && this.props.private && this.props.hidden === true && (
                            <button onClick={() => this.onUncover(this.props.id)} type="submit" className="my_btn btn btn-info" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-unlock" viewBox="0 0 16 16">
                                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                                </svg>
                            </button>
                        )}
                        <button onClick={this.onListOf} type="submit" className="my_btn btn btn-info" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list-check" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
                            </svg>
                        </button>
                        {AuthHelper.getInstance().isUserTeacher() && this.props.private && this.props.hidden !== true && (
                            <button onClick={() => this.onHide(this.props.id)} type="submit" className="my_btn btn btn-info" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                </svg>
                            </button>
                        )}

                        {/* { this.props.path !== null && (
                                    <img src={'http://127.0.0.1:8000/storage/'+this.props.path.substr(6)}/>
                                    )} */}
                    </div>
                </Card.Body>
                {getAllErrors(this.state.statusErrors)}
            </Card>
        )
    }
}

export default withRouter(Task)