import React, {useContext} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }

    return (

        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                {/*<span className="navbar-brand">Logo</span>*/}
                <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">

                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="create" to="/create">
                                Create
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link " to="/links">
                                Links
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="/" onClick={logoutHandler}>
                                OUT
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}