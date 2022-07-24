import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {ServiceCard} from "../components/ServiceCard";

export const DetailPage = () => {
    const {token,getId,users} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [service,setService] = useState(null)
    const [user,setUser] = useState(null)
    const serviceId = useParams().id
    console.log('det',users)


    const getService = useCallback( async () => {
        try {
           const fetched = await request(`/api/service/${serviceId}`, 'GET', null, {
              Authorization: `Bearer ${token}`
           })
           const getUsername = await request(`/api/user/${fetched.owner}`,'GET',null, {
               Authorization: `Bearer ${token}`
           })
            console.log('detail',service)
            setService (fetched)
            setUser(getUsername)
        } catch (e) {
            
        }
    },[token, serviceId, request])

    useEffect( () => {
        getService()
    },[getService])

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="row justify-content-center" >
            <div className="col-12 col-md-8 col-lg-8 col-xl-8">
            {!loading && <ServiceCard service={service  || undefined} user = {user || undefined}/>}

        </div>
        </div>
    )
}