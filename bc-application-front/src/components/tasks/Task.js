import { React, Component } from 'react'
import { withRouter } from 'react-router-dom'
import AuthHelper from '../../helpers/AuthHelper'
import dateFormat from 'dateformat';

class Task extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: new Date(Date()),
        }

        this.onEdit = this.onEdit.bind(this)
        this.onAssign = this.onAssign.bind(this)
        this.onListOf = this.onListOf.bind(this)
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

    render() {
        return (
            <div className="container" key={this.props.key}>
                <div className="row mb-2">
                    <div className="col-md-12">
                        <div className="d-flex justify-content-end">
                            {AuthHelper.getInstance().isUserTeacher() && this.props.private && this.props.hidden !== true && (
                                <button onClick={() => this.props.onHide(this.props.id)} type="submit" className="my_btn btn btn-dark" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <div className="card flex-md-row mb-4 box-shadow h-md-250">
                            <div className="card-body d-flex flex-column align-items-center">

                                <strong className="d-inline-block mb-2 text-secondary">{this.props.type}</strong>
                                <h3 className="mb-0">
                                    <p className="text-dark" >{this.props.title}</p>
                                </h3>
                                <div className="mb-1 text-muted"><small><u> Vytvorené:</u> ( {this.props.userName} {this.props.userSurname} )</small></div>
                                {!this.compareDates(this.props.deadline) && (
                                    <div className="mb-1 text-danger">
                                       DEADLINE : {this.toDate(this.props.deadline)}</div>
                                )}
                                {this.compareDates(this.props.deadline) && (
                                    <div className="mb-1 text-muted">
                                         DEADLINE : {this.toDate(this.props.deadline)}</div>
                                )}
                                <br style={{ color: 'grey' }} />
                                <p className="card-text mb-auto text-default">Popis zadania: {this.props.content}</p>
                                <p className="card-text mb-auto text-muted"><small>Priložený súbor: {this.props.path} </small></p>
                                {/* <a href="#">Continue reading</a> */}
                                <p></p>
                                <div>
                                    {AuthHelper.getInstance().isUserTeacher() && this.props.private && this.props.hidden !== true && (
                                        <button onClick={this.onEdit} type="submit" className="my_btn btn btn-dark" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                            </svg>
                                        </button>
                                    )}
                                    {AuthHelper.getInstance().isUserTeacher() && this.props.private && this.props.hidden !== true && (
                                        <button onClick={() => this.props.onDelete(this.props.id)} type="submit" className="my_btn btn btn-dark" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </button>
                                    )}
                                    {AuthHelper.getInstance().isUserTeacher() && this.props.private && this.props.hidden !== true && (
                                        <button onClick={this.onAssign} type="submit" className="my_btn btn btn-dark" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                            </svg>
                                        </button>
                                    )}
                                    {AuthHelper.getInstance().isUserTeacher() && this.props.private && this.props.hidden === true && (
                                        <button onClick={() => this.props.onUncover(this.props.id)} type="submit" className="my_btn btn btn-dark" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-unlock" viewBox="0 0 16 16">
                                                <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                                            </svg>
                                        </button>
                                    )}
                                    <button onClick={this.onListOf} type="submit" className="my_btn btn btn-dark" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list-check" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Task)