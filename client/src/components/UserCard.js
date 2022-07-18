import React from "react";


export function UserCard(props) {

    return (

        <div className="card text-dark bg-light" style={{width:"250px"}}>

            <div className="card-header ">
                <h5 className="text-center">User card</h5>
            </div>
            <div className="card-title">
                <h6 className="text-center">{props.user.firstName} {props.user.lastName}</h6>
            </div>
            <div className="card-text">
            <ul className="  list-group list-group-flush">
                <li className="list-group-item ">
                    <p>First Name: {props.user.firstName}</p>
                </li>
                <li className="list-group-item">
                    <p>Last Name: {props.user.lastName}</p>
                </li>
                <li className="list-group-item">
                    <p>Phone: {props.user.phone}</p>
                </li>
                <li className="list-group-item">
                    <p>Email: {props.user.email}</p>
                </li>
            </ul>
            {/*

            <p>First Name: <a href={user.firstName} target="_blank" rel="noopener noreferrer">{user.to}</a></p>
            <p>Last Name: <a href={user.lastName} target="_blank" rel="noopener noreferrer">{user.from}</a></p>
            <p>Phone: <strong>{user.phone}</strong></p>
            <p>Email: <strong>{new Date(user.date).toLocaleDateString()}</strong></p>*/}
            </div>

        </div>
    )
}