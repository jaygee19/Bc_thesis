import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthHelper from '../helpers/AuthHelper'
import { getApiResponse } from '../helpers/ApiHelper'
import { withRouter } from 'react-router-dom'
import FRI_Logo from '../images/FRI_Logo2.png'
import NavDropdown from 'react-bootstrap/NavDropdown';

class Navigation extends Component {

    constructor(props) {
        super(props)

        this.state = {
            navCollapsed: true,
        }

        this.setNavCollapsed = this.setNavCollapsed.bind(this)
        this.onLogout = this.onLogout.bind(this)
    }

    setNavCollapsed(e) {
        this.setState({
            navCollapsed: !this.state.navCollapsed,
        })
    }

    onLogout() {

        getApiResponse('logout', 'post', {
            id: AuthHelper.getInstance().getUserID(),
        })
            .then((res) => {
                console.log("32", res)
                AuthHelper.getInstance().logoutUser()
                this.props.history.push('/')
            })
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!this.state.navCollapsed ? true : false} aria-label="Toggle navigation" onClick={this.setNavCollapsed}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${this.state.navCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
                    <div className="container">
                        {this.state.navCollapsed && (
                            <img className="front-image fri_logo" src={FRI_Logo} alt="FRI_Logo" />
                        )}
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active font-weight-bolder">
                                <Link to="/" className="nav-link">O predmete</Link>
                            </li>

                            {AuthHelper.getInstance().isUserTeacher() && (
                                <li className="nav-item active font-weight-bolder">
                                    <Link to="/myTasks" className="nav-link">Moje zadania</Link>
                                </li>
                            )}
                            {AuthHelper.getInstance().isUserTeacher() && (
                                <li className="nav-item active font-weight-bolder">
                                    <Link to="/hiddenTasks" className="nav-link">Skryté zadania</Link>
                                </li>
                            )}
                            {AuthHelper.getInstance().isUserTeacher() && (
                                <li className="nav-item active font-weight-bolder">
                                    <Link to="/subjectTasks" className="nav-link">Všetky zadania</Link>
                                </li>
                            )}
                            {AuthHelper.getInstance().isUserStudent() && (
                                <li className="nav-item active font-weight-bolder">
                                    <Link to="/studentTasks" className="nav-link">Pridelené zadania</Link>
                                </li>
                            )}
                        </ul>
                        <div>
                            {!AuthHelper.getInstance().isUserLoggedIn() && (
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item active font-weight-bolder">
                                        <Link to="/login" className="nav-link" >Prihlásanie</Link>
                                    </li>
                                    {/* <li className="nav-item active font-weight-bolder">
                                        <Link to="/register" className="nav-link">Register</Link>
                                    </li> */}
                                </ul>
                            )}
                            {AuthHelper.getInstance().isUserLoggedIn() && (
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item active font-weight-bolder">
                                        <NavDropdown title={AuthHelper.getInstance().getUserName()} id="basic-nav-dropdown">
                                            <Link onClick={() => this.onLogout()} className="nav-link nav-dropdown">Odhlásiť</Link>
                                        </NavDropdown>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

}

export default withRouter(Navigation)
