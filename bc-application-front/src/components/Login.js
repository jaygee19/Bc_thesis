import React, {useState} from 'react'
import { Redirect } from 'react-router-dom';

const Login = () => {
    const [ldap_login, setLdap] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);


    const submit = async (e) => {
        e.preventDefault();

        await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            //credentials: 'include',
            body: JSON.stringify({
                ldap_login,
                password
            })
        });
        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/"/>
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input className="form-control" placeholder="Ldap_login" required 
                            onChange={e => setLdap(e.target.value)}
            />
            <input type="password" className="form-control" placeholder="Password" required 
                            onChange={e => setPassword(e.target.value)}
            />
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
};

export default Login;