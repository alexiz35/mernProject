import React from "react";

export const ServiceCard = ({service,user}) => {

    return (
        <>

            <div className="card-header ">
                <h5 className="text-center">Service card</h5>
            </div>
            <div className="card-title">
                <h6 className="text-center">{`${new Date(service.date).toLocaleDateString()} (client: ${user.firstName} ${user.lastName})`} </h6>
            </div>
            <div className="card-text">
                <ul className="  list-group list-group-flush">
                    <li className="list-group-item ">
                        <p>Device: {service.device}</p>
                    </li>
                    <li className="list-group-item">
                        <p>Claim: {service.claim}</p>
                    </li>
                    <li className="list-group-item">
                        <p>Service: {service.service}</p>
                    </li>
                    <li className="list-group-item">
                        <p>Cost: {service.cost}</p>
                    </li>
                </ul>

            </div>
        </>
    )
}

ServiceCard.defaultProps = {
    service: {
        device: '-------------',
        claim: '-------------',
        service: '-------------',
        cost: '-------------',
        date: '-------------'
    },
    user : {
        firstName: '-------------',
        lastName: '-------------'
    }
}