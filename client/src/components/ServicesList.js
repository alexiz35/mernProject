import React from "react";
import {Link} from "react-router-dom"



export const ServicesList = ({services: services, enableStatus, clickAdd, clickField, clickStatus}) => {
    if (!services.length) {
        return <p className="center">No services</p>
    }

    function styleColor (recStatus)  {
        let style = {color: ''}
        switch (recStatus) {
            case "received": style.color = "red"
                break
            case "process": style.color = "yellow"
                break
            case "success": style.color = "green"
                break
            default: break
        }
        return style
    }


    return (
            <div className="table-responsive-lg" style={{overflowY: 'auto', maxHeight: '450px'}}>
            <table className="table table-dark table-hover" >
                <thead>
                <tr>
                    <th>№</th>
                    <th onClick={(e) => clickField(e)} id="device">Device</th>
                    <th onClick={(e) => clickField(e)} id="claim">Claim</th>
                    <th onClick={(e) => clickField(e)} id="service">Service</th>
                    <th onClick={(e) => clickField(e)} id="cost">Cost</th>
                    <th onClick={(e) => clickField(e)} id="date">Date</th>
                    <th>Status</th>
                    <th/>
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

                                <div className="btn-group dropend">
                                    <button className="btn btn-outline-secondary dropdown-toggle"
                                            type="button"
                                            id={service._id}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            data-bs-auto-close="true"
                                            style={styleColor(service.status)}
                                            disabled={enableStatus}
                                    >
                                        {service.status}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby={service._id}>
                                        <li className= "list-group-item-danger">
                                            <button
                                                className="dropdown-item"
                                                id = "received"
                                                onClick={(e)=>clickStatus(e,service._id)}
                                            >
                                                Received
                                            </button>
                                        </li>
                                        <li className= "list-group-item-warning">
                                            <button
                                                className="dropdown-item"
                                                id = "process"
                                                onClick={(e)=>clickStatus(e,service._id)}
                                            >
                                                In process
                                            </button>
                                        </li>
                                        <li className= "list-group-item-success">
                                            <button
                                                className="dropdown-item"
                                                id = "success"
                                                onClick={(e)=>clickStatus(e,service._id)}
                                            >
                                                Success
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td>
                                {<Link to={`/detail/${service._id}`}>
                                    <button className="btn btn-outline-secondary">Detail</button>
                                </Link>}
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td colSpan="8">
                        <div className="d-flex justify-content-center ">
                            <button className="w-100 btn btn-dark" onClick={() => {
                                clickAdd()
                            }}>+
                            </button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
    )
}
