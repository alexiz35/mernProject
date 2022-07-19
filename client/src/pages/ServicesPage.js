import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {ServicesList} from "../components/ServicesList";
import {UserCard} from "../components/UserCard";
import {useNavigate} from "react-router";

export const ServicesPage = () => {
    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const {loading, request} = useHttp()
    const {token,getId,setGetId,user,setUser,setPage} = useContext(AuthContext)



    const addHandler = () => {
        navigate('/create')
    }

    const backHandler = () => {
        navigate('/admin')
    }

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
        setPage('Service request')
        //console.log('ServiceID:',userId)

    }, [fetchservices])

    if (loading) {
        return <Loader/>
    }


    return (
        <div className="row">


            <div className="col-12">
                <h1 className="text-light">_</h1>
            </div>
            <div className="col-12" style={{display: 'flex',justifyContent:'space-between'}}>
                <button className="btn btn-secondary "
                    onClick={backHandler}
                >
                    Back
                </button>
                <button className="btn btn-secondary "
                    onClick={addHandler}
                >
                    ADD request
                </button>
            </div>
            <div className="col-12 col-sm-4 col-md-4 col-lg-3 justify-content-center" style={{marginTop: '40px'}}>
                {user && <UserCard user={user}/>}
            </div>
            <div className="col-12 col-sm-8 col-md-8 col-lg-9 justify-content-center">
                <h4 className="">List request</h4>

                    {!loading && <ServicesList services={services}/>}

            </div>
        </div>
    )
}
