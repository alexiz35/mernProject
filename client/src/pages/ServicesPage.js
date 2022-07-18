import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {ServicesList} from "../components/ServicesList";
import {UserCard} from "../components/UserCard";

export const ServicesPage = () => {

    const [services, setServices] = useState([])
    const {loading, request} = useHttp()
    const {token,getId,setGetId,user,setUser} = useContext(AuthContext)



    const fetchservices = useCallback(async () => {
        try {
            const fetched = await request('/api/service', 'POST', {userSelect: user}, {
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
                <h1 className="center-align">Service request</h1>
            </div>
            <div className="" style={{display: 'flex',justifyContent:'space-between'}}>
                <button className="waves-effect waves-orange btn " >Back</button>
                <button className="waves-effect waves-green btn " >ADD request</button>
            </div>
            <div className="col s12 m4 l3 blue-grey lighten-4">
                <h4 className="center-align">User card</h4>
                {user && <UserCard user={user}/>}
            </div>
            <div className="col s12 m8 l9 blue-grey lighten-5">
                <h4 className="center-align">List request</h4>

                    {!loading && <ServicesList services={services}/>}

            </div>
        </div>
    )
}
