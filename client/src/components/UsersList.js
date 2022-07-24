import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {click} from "@testing-library/user-event/dist/click";

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
        <div className="table-responsive" style={{overflowY: 'auto', maxHeight: '450px'}}>
            <table className="table table-dark table-hover"  >

                    <thead  >
                <tr >
                    <th>№</th>
                    <th onClick={(e)=>props.clickField(e)} id="firstName" >First Name</th>
                    <th onClick={(e)=>props.clickField(e)} id="lastName">Last Name</th>
                    <th onClick={(e)=>props.clickField(e)} id="phone">Phone</th>
                    <th onClick={(e)=>props.clickField(e)} id="email">Email</th>
                </tr>
                </thead>
                <tbody >
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