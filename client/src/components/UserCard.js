import React from "react";

export const UserCard = (props) => {

    const {user,button} = props
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

            </div>
            <div className="row justify-content-center">
                <div className=" ">
                    <button className="col-12 btn btn-secondary" onClick={()=>props.clickButton()} disabled={!button}>
                        {button}
                    </button>
                </div>
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
