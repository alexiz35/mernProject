import React from "react";
import {Link} from "react-router-dom"

export const ServicesList = ({services: services}) => {
    if (!services.length) {
        return <p className="center">No services</p>
    }

    return (
        <div className="">

                {services.map((service, index) => {
                    return (
                        <tr key={service._id}>
                            <td>{index + 1}</td>
                            <td>{service.device}</td>
                            <td>{service.claim}</td>
                            <td>{service.date}</td>
                            <td>{service.cost}</td>
                            <td>{service.service}</td>
                            <td>
                                {<Link to={`/detail/${service._id}`}>Open</Link>}
                            </td>
                        </tr>
                    )
                })}

        </div>
    )
}
