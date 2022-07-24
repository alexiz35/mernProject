import React from "react";
import {Link} from "react-router-dom"

export const ServicesList = ({services: services,clickAdd}) => {
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
                    <th></th>
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
                            <td>
                                {<Link to={`/detail/${service._id}`}>
                                    <button className="btn btn-outline-secondary">Detail</button>
                                </Link>}
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td colSpan="7">
                        <div className="d-flex justify-content-center ">
                            <button className="w-100 btn btn-dark" onClick={()=>{clickAdd()}}>+</button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
