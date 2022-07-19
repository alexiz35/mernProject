import React from "react";
import {Link} from "react-router-dom"

export const ServicesList = ({services: services}) => {
    if (!services.length) {
        return <p className="center">No services</p>
    }

    return (
        <div className="table-responsive">
            <table className="table table-dark table-hover">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Device</th>
                    <th>Claim</th>
                    <th>Service</th>
                    <th>Cost</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {services.map((service, index) => {
                    return (
                        <tr key={service._id}>
                            <td>{index + 1}</td>
                            <td>{service.device}</td>
                            <td>{service.claim}</td>
                            <td>{service.service}</td>
                            <td>{service.cost}</td>
                            <td>{new Date(service.date).toLocaleDateString()}</td>
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
