import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthHelper from '../helpers/AuthHelper';

class Test extends Component {
    constructor(props) {
        super(props)

        this.state = {
            navCollapsed: true,
        }

        this.setNavCollapsed = this.setNavCollapsed.bind(this)
    }

    setNavCollapsed(e) {
        this.setState({
            navCollapsed: !this.state.navCollapsed,
        })
    }

    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!this.state.navCollapsed ? true : false} aria-label="Toggle navigation" onClick={this.setNavCollapsed}>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class={`${this.state.navCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
                    <div className="container-fluid">
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="navbar-brand font-weight-bolder">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                        </ul>
                        <div>
                            {!AuthHelper.getInstance().isUserLoggedIn() && (
                            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <Link to="/login" className="nav-link" >Login</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to="/test" className="nav-link">Test</Link>
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

export default Test;
