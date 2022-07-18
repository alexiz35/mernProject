import React, {useContext, useState} from "react";
import {Link} from "react-router-dom"
import {AuthContext} from "../context/AuthContext";

export function UsersList(props) {
    const {getId, setGetId} = useContext(AuthContext)

    if (!props.users.length) {
        return <p className="center">No services</p>
    }

    const clickHandler = (e) => {
        const id = e.target.getAttribute('data-item')
        setGetId(id)
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>№</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {props.users.map((user, index) => {
                    return (

                        <tr key={user._id} data-item={user._id} onClick={clickHandler}>
                            <td data-item={user._id}>{index + 1}</td>
                            <td data-item={user._id}>{user.firstName}</td>
                            <td data-item={user._id}>{user.lastName}</td>
                            <td data-item={user._id}>{user.phone}</td>
                            <td data-item={user._id}>{user.email}</td>
                            {/* <td>
                            {<Link to={`/detail/${service._id}`}>Open</Link>}
                        </td>*/}

                        </tr>

                    )
                })}
                </tbody>
            </table>

        </div>
    )
}