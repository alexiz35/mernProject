import React, {useContext, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import PropTypes from "prop-types"
import mainStore from '../store/store'
import {useSelector} from "react-redux";


export const Navbar = (props) => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    //const {page} = useContext(AuthContext)
    const pageName = useSelector(state => state.title)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }




    return (

        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <span className="navbar-brand">{pageName}</span>
                <button
                    className="navbar-toggler "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="true"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">

                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            {props.admin &&
                            <NavLink className="nav-link " aria-current="create" to="/create">
                                Create
                            </NavLink>
                            }
                        </li>
                        <li className="nav-item">
                            {props.admin &&
                            <NavLink className="nav-link " to="/admin">
                                Users
                            </NavLink>
                            }
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="/" onClick={logoutHandler}>
                                LOG OUT
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    admin: PropTypes.bool.isRequired
}

