import React from "react";

export const UserCard = (props) => {

    const {user} = props

    return (

        <div className="card text-dark bg-light" >

            <div className="card-header ">
                <h5 className="text-center">User card</h5>
            </div>
            <div className="card-title">
                <h6 className="text-center">{user.firstName} {user.lastName}</h6>
            </div>
            <div className="card-text">
                <ul className="  list-group list-group-flush">
                    <li className="list-group-item ">
                        <p>First Name: {user.firstName}</p>
                    </li>
                    <li className="list-group-item">
                        <p>Last Name: {user.lastName}</p>
                    </li>
                    <li className="list-group-item">
                        <p>Phone: {user.phone}</p>
                    </li>
                    <li className="list-group-item">
                        <p>Email: {user.email}</p>
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

UserCard.defaultProps = {
    user :{
        firstName: '-----------',
        lastName: '-----------',
        phone: '-----------',
        email: '-----------'
    }
}
