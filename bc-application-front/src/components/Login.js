import React, {Component, useState} from 'react'
import { Redirect } from 'react-router-dom';
import { getApiResponse } from '../helpers/ApiHelper'
import { getErrorsView } from '../helpers/ErrorHelper'
import AuthHelper from '../helpers/AuthHelper'

class Login extends Component {
    //const [ldap_login, setLdap] = useState('');
    //const [password, setPassword] = useState('');
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
            console.log("okej" + res)
            AuthHelper.getInstance()
              .loginUser(res.data.token)
              .then(() => {
                this.props.history.push('/')
              })
        })
        .catch((e) => {
            console.log("cathc" + e)
            this.setState({
              passwordErrors: e.response.data['password'] || [],
            })
        })

        // if(this.state.passwordErrors == [])
        // {
        //     this.setState({
        //         redirect: true,
        //     })
        // }
      }
   
    // const [redirect, setRedirect] = useState(false);


    // const submit = async (e) => {
    //     e.preventDefault();

    //     getApiResponse('login', 'post', {
    //         headers: {'Content-Type': 'application/json'},
    //         //credentials: 'include',
    //         body: JSON.stringify({
    //             ldap_login,
    //             password
    //         })
    //     });
    //     setRedirect(true);
    // }

    render()
    {
        if (this.state.redirect) {
            return <Redirect to="/"/>
        }
        return (
            <form onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
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
            </form>
        )
    } 
}

export default Login
