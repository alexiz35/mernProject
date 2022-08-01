import React from "react";
import PropTypes from "prop-types"

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
                        <p><b>Device:</b> <i>{service.device}</i></p>
                    </li>
                    <li className="list-group-item">
                        <p><b>Claim:</b> <i>{service.claim}</i></p>
                    </li>
                    <li className="list-group-item">
                        <p><b>Service:</b> <i>{service.service}</i></p>
                    </li>
                    <li className="list-group-item">
                        <p><b>Cost:</b> <i>{service.cost}</i></p>
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

ServiceCard.propTypes = {
    service: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}