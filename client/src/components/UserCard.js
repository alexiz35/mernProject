import React from "react";


export function UserCard(props) {

    return (

        <>

            <h5>{props.user.firstName} {props.user.lastName}</h5>

            <ul className="">
                <li>
                    <p>First Name: {props.user.firstName}</p>
                </li>
                <li>
                    <p>Last Name: {props.user.lastName}</p>
                </li>
                <li>
                    <p>Phone: {props.user.phone}</p>
                </li>
                <li>
                    <p>Email: {props.user.email}</p>
                </li>
            </ul>
            {/*

            <p>First Name: <a href={user.firstName} target="_blank" rel="noopener noreferrer">{user.to}</a></p>
            <p>Last Name: <a href={user.lastName} target="_blank" rel="noopener noreferrer">{user.from}</a></p>
            <p>Phone: <strong>{user.phone}</strong></p>
            <p>Email: <strong>{new Date(user.date).toLocaleDateString()}</strong></p>*/}

        </>
    )
}