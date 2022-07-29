import React, {useCallback, useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {ServiceCard} from "../components/ServiceCard";

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [service, setService] = useState(null)
    const [user, setUser] = useState(null)
    const serviceId = useParams().id
    const navigate = useNavigate()


    const clickHandler = () => {
        navigate(-1)
    }

    const getService = useCallback(async () => {
        try {
            const fetched = await request(`/api/service/${serviceId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            const getUsername = await request(`/api/user/${fetched.owner}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setService(fetched)
            setUser(getUsername)
        } catch (e) {

        }
    }, [token, serviceId, request])

    useEffect(() => {
        getService()
    }, [getService])

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-8 col-xl-8">
                {!loading && <ServiceCard
                    service={service || undefined}
                    user={user || undefined}
                />}

            </div>
            <div className="col-12 d-flex justify-content-center mt-5">
                <button
                    className="btn-dark btn-lg"
                    onClick={clickHandler}
                >
                    {`<< BACK`}
                </button>
            </div>
        </div>
    )
}