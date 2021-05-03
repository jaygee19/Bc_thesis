import React, { Component } from 'react'
import { getApiResponse } from '../../helpers/ApiHelper'
import { getAllErrors } from '../../helpers/ErrorHelper'
import AuthHelper from '../../helpers/AuthHelper'
import Navigation from '../Navigation'
import OS from '../../images/OS.png'
import { withRouter } from 'react-router-dom'


class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ldap_login: '',
            password: '',
            redirect: false,
            password_errors: [],
            other_errors: [],
            ldap_errors: [],
            status_errors: [],
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.ldapFilled = this.ldapFilled.bind(this)
        this.passwordFilled = this.passwordFilled.bind(this)

    }

    ldapFilled(event) {
        this.setState({
            ldap_login: event.target.value,
        })
    }

    passwordFilled(event) {
        this.setState({
            password: event.target.value,
        })
    }

    onSubmit(event) {
        event.preventDefault()

        getApiResponse('login', 'post', {
            ldap_login: this.state.ldap_login,
            password: this.state.password,
        })
            .then((r) => {
                AuthHelper.getInstance().loginUser(r.data.token)
                    .then(() => {
                        this.props.onLogin()
                        this.props.history.push('/')
                    })
            })
            .catch((e) => {
                this.setState({
                    other_errors: e.response.data['errors'] || [],
                    password_errors: e.response.data['password'] || [],
                    ldap_errors: e.response.data['ldap_login'] || [],
                    status_errors: e.response.data['status'] || [],
                })
            })
    }

    render() {
        return (
            <div className="">
                <Navigation />
                <div className="container">
                    <div className="card login-card">
                        <div className="row no-gutters">
                            <div className="col-md-6 logo-card">
                                <img className="front-image" src={OS} alt="OS" />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body sign-card">
                                    <h3 className="login-card-description">Princípy operačných systémov</h3>
                                    <hr/>
                                    <form onSubmit={this.onSubmit}>
                                        <h5 className="mb-3 fw-normal">Prihlásenie:</h5>
                                        <input type="text" className="form-control" placeholder="Ldap_login"
                                            id="ldap_login"
                                            name="ldap_login"
                                            value={this.state.ldap_login}
                                            onChange={this.ldapFilled}
                                            required
                                        />
                                        {getAllErrors(this.state.ldap_errors)}
                                        <input type="password" className="form-control" placeholder="Heslo"
                                            id="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.passwordFilled}
                                            required
                                        />
                                        {getAllErrors(this.state.password_errors)}
                                        {getAllErrors(this.state.other_errors)}
                                        {getAllErrors(this.state.status_errors)}
                                        <button className="w-100 btn btn-lg btn-info" type="submit">Prihlásiť</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)


