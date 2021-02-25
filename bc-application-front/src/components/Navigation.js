import React from 'react'
import { Link } from 'react-router-dom';
import AuthHelper from '../helpers/AuthHelper';

function Navigation(props) {
    let menu;
    if (!AuthHelper.getInstance().isUserLoggedIn()) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    } else {
        menu = ( 
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item active">
                <Link to="/logout" className="nav-link">Logout</Link>
            </li>
        </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>
                <div>
                    {menu}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;