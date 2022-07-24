import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {ServicesList} from "../components/ServicesList";
import {UserCard} from "../components/UserCard";
import {useNavigate} from "react-router";
import {ModalEditUser} from "../components/ModalEditUser";
import Modal from "bootstrap/js/src/modal";

export const UserPage = () => {
    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const {loading, request} = useHttp()
    const {token,userId,setGetId,user,setUser,setPage} = useContext(AuthContext)



/*    const addHandler = () => {
        navigate('/create')
    }

    const backHandler = () => {
        navigate('/admin')
    }*/

    const editUserHandler = () => {
        let myModal = new Modal(document.getElementById('staticBackdrop'),)
        myModal.show()
    }

    const fetchservices = useCallback(async () => {
        try {
            const fetched = await request('/api/service', 'POST', {userSelect: userId}, {
                Authorization: `Bearer ${token}`
            })
            setServices(fetched)
        } catch (e) {
        }
    }, [token, request])

    const fetchUser = useCallback(async () => {
        try {
            const data = await request(`/api/user/${userId}`,'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(data)
           // navigate(`/detail/${data.service._id}`)
        } catch (e) {
        }

    },[token,request])

    useEffect(() => {
        fetchUser()
        fetchservices()
        setPage('Service request')

    }, [fetchservices,fetchUser])

    if (loading) {
        return <Loader/>
    }


    return (
        <div className="row">


          {/*  <div className="col-12">
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
            </div>*/}

            <div className="col-12 col-sm-4 col-md-4 col-lg-3 justify-content-center" style={{marginTop: '40px'}}>
                <UserCard user={user || undefined} button={'Edit'} clickButton={editUserHandler}/>
            </div>
            <div className="col-12 col-sm-8 col-md-8 col-lg-9 justify-content-center">
                <div className="  col-9 d-flex " style={{marginTop: '50px'}}>
                    <input className="form-control " id="inputSearch" type="search" placeholder="Search by email" aria-label="search"
                    />
                </div>
                <h4 className="">List request</h4>

                {!loading && <ServicesList services={services}/>}

            </div>

            <ModalEditUser/>
        </div>
    )
}
