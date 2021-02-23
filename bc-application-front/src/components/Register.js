import React, {useState} from 'react'
import { Redirect } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [ldap_login, setLdap] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        
        //const response = await fetch('http://127.0.0.1:8000/api/register', {
        await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                surname,
                ldap_login,
                password
            })
        });

        // const content = await response.json();

        // console.log(content);

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/login"/>
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>
            <input className="form-control" placeholder="Name" required 
                onChange={e => setName(e.target.value)}
            />
            <input className="form-control" placeholder="Surname" required 
                onChange={e => setSurname(e.target.value)}
            />
            <input className="form-control" placeholder="Ldap_login" required 
                onChange={e => setLdap(e.target.value)}
            />
            <input type="password" className="form-control" placeholder="Password" required 
                onChange={e => setPassword(e.target.value)}
            />
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default Register;