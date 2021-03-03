import { React, Component } from 'react'
import { withRouter } from 'react-router-dom'
import AuthHelper from '../../helpers/AuthHelper'

class Task extends Component {
    constructor(props) {
        super(props)
        this.onEdit = this.onEdit.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    onEdit() {
        console.log("IDCKO" + this.props.id)
        this.props.history.push('/myTasks/' + this.props.id + '/edit')
    }

    onDelete() {
        console.log("DELETE" + this.props.id)
        this.props.history.push('/myTasks/' + this.props.id + '/delete')
    }


    render() {
        // return (
        //     <div className="container col-6">
        //         <div className="row">
        //             <div className="col-12 jumbotron">
        //                 <h1 className="display-4">Title</h1>
        //                 <p className="lead">{this.props.type}</p>
        //                 <p className="lead">{this.props.date}</p>
        //                 <hr className="my-4" />
        //                 <p>{this.props.content}</p>
        //                 {AuthHelper.getInstance().isUserTeacher() && (
        //                     <button onClick={this.onEdit} type="submit" className="btn btn-primary" >
        //                         Upraviť
        //                     </button> 
        //                 )} 
        //                 {AuthHelper.getInstance().isUserTeacher() && (
        //                     <button  onClick={() => this.props.onDelete(this.props.id)} type="submit" className="btn btn-primary" >
        //                         Vymazať
        //                     </button>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // )

        return (
            <div className="container">
                <div class="row mb-2">
                    <div class="col-md-6">
                        <div class="card flex-md-row mb-4 box-shadow h-md-250">
                            <div class="card-body d-flex flex-column align-items-start">
                                <strong class="d-inline-block mb-2 text-secondary">{this.props.type}</strong>
                                <h3 class="mb-0">
                                    <a class="text-dark" href="#">Title</a>
                                </h3>
                                <div class="mb-1 text-muted"><small>Upravené: {this.props.date} ( {this.props.userName} {this.props.userSurname} )</small></div>
                                <div class="mb-1 text-muted"><small>Deadline: {this.props.deadline}</small></div>
                                <p class="card-text mb-auto text-info"><small>Popis zadania: {this.props.content}</small></p>
                                <p class="card-text mb-auto text-info"><small>Priložený súbor: </small></p>
                                {/* <a href="#">Continue reading</a> */}
                                <p></p>
                                <div>
                                {AuthHelper.getInstance().isUserTeacher() && (
                                    <button onClick={this.onEdit} type="submit" className="btn btn-primary" >
                                        Upraviť
                                    </button>
                                )}
                                {AuthHelper.getInstance().isUserTeacher() && (
                                    <button onClick={() => this.props.onDelete(this.props.id)} type="submit" className="btn btn-primary" >
                                        Vymazať
                                    </button>
                                )}
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