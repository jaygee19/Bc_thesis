import React, { Component } from 'react'
import { getApiResponse } from '../helpers/ApiHelper'
import { getErrorsView } from '../helpers/ErrorHelper'
import AuthHelper from '../helpers/AuthHelper'
import Navigation from './Navigation'
import Untitled from '../Untitled.png';
import { Redirect } from 'react-router-dom'


class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ldap_login: '',
            password: '',
            redirect: false,
            passwordErrors: [],
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.ldapFilled = this.ldapFilled.bind(this)
        this.passwordFilled = this.passwordFilled.bind(this)
    }

    ldapFilled(e) {
        this.setState({
            ldap_login: e.target.value,
        })
    }

    passwordFilled(e) {
        this.setState({
            password: e.target.value,
        })
    }

    onSubmit(event) {
        event.preventDefault()
        console.log(this.state.ldap_login)
        console.log(this.state.password)
        getApiResponse('login', 'post', {
            ldap_login: this.state.ldap_login,
            password: this.state.password,
        })
            .then((res) => {
                //console.log("okej" + res.data.token)
                AuthHelper.getInstance()
                    .loginUser(res.data.token)
                    .then(() => {
                        this.props.history.push('/')
                    })
            })
            .catch((e) => {
                //console.log("cathc" + e)
                this.setState({
                    passwordErrors: e.response.data['password'] || [],
                })
            })
    }

    render() {
        return (
            <div className="bg-dark">
                <Navigation />
                <div className="container">
                    <div className="card login-card">
                        <div className="row no-gutters">
                            <div className="col-md-6 logo-card">
                                <img className="front-image" src={Untitled} />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body sign-card">
                                    <h3 className="login-card-description">Princípy operačných systémov</h3>
                                    <p></p>
                                    <form onSubmit={this.onSubmit}>
                                        <h5 className="mb-3 fw-normal">Prihlásenie</h5>
                                        <input className="form-control" placeholder="Ldap_login"
                                            id="ldap_login"
                                            name="ldap_login"
                                            value={this.state.ldap_login}
                                            onChange={this.ldapFilled}
                                            required
                                        />
                                        <input type="password" className="form-control" placeholder="Password"
                                            id="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.passwordFilled}
                                            required
                                        />
                                        {getErrorsView(this.state.passwordErrors)}
                                        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                                        <p className="mt-5 mb-3 text-muted">&copy; since 2021</p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
            </div>
        )
    }
}

export default Login


