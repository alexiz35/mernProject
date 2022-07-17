import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {ServicesList} from "../components/ServicesList";

export const ServicesPage = () => {

    const [services, setServices] = useState([])
    const {loading, request} = useHttp()
    const {token,getId,setGetId} = useContext(AuthContext)



    const fetchservices = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setServices(fetched)
            console.log('servicePage:', services)
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchservices()
        console.log('Service:',getId)
        //console.log('ServiceID:',userId)

    }, [fetchservices])

    if (loading) {
        return <Loader/>
    }


    return (
        <div className="row">
            <div className="s12">
                <h1 className="center-align">My service request</h1>
            </div>
            <div className="col s12 m4 l3 blue-grey lighten-4">
                <ol>
                    <h3 className="center-align">My details</h3>
                </ol>
            </div>
            <div className="col s12 m8 l9 blue-grey lighten-5">
                <h4 className="center-align">List request</h4>
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Origin link</th>
                        <th>Cut link</th>
                        <th>Open</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!loading && <ServicesList services={services}/>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
