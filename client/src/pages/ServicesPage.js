import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {ServicesList} from "../components/ServicesList";
import {UserCard} from "../components/UserCard";
import {useNavigate} from "react-router";
import {editUserHandler, ModalEditUser} from "../components/ModalEditUser";
import {filterTable, getFieldId} from "../components/Function";

export const ServicesPage = () => {
    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [fieldSearch, setFieldSearch] = useState('device')
    const [tempServices, setTempServices] = useState([])
    const [modalOk, setModalOk] = useState(false)
    const {loading, request} = useHttp()
    const {token, user, setPage} = useContext(AuthContext)


    const addHandler = () => {
        navigate('/create')
    }

    /* const backHandler = () => {
         navigate('/admin')
     }*/

    const getUserField = (e) => {

        setFieldSearch(getFieldId(e))
    }

    const searchServiceHandler = (e) => {
        const search = e.target.value
        if (search === '') {
            return setTempServices(services)
        }
        setTempServices(filterTable(services, search, fieldSearch))
    }


    const sendHandler = async (form) => {
        try {
            await request('/api/user/edit', 'POST', {...form, userId: user._id}, {
                Authorization: `Bearer ${token}`
            })
            setModalOk(true)
        } catch (e) {

        }
    }

    const fetchServices = useCallback(async () => {
        try {
            const fetched = await request('/api/service', 'POST', {userSelect: user._id}, {
                Authorization: `Bearer ${token}`
            })
            setServices(fetched)
            setTempServices(fetched)
            setModalOk(false)
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchServices()
        setPage('Service request')

    }, [fetchServices, modalOk])

    if (loading) {
        return <Loader/>
    }


    return (
        <div className="row mt-5">


            <div className="col-12 col-sm-4 col-md-4 col-lg-3 justify-content-center mt-5">

                <UserCard
                    user={user || undefined}
                    button={'Edit'}
                    clickButton={editUserHandler}
                />

            </div>
            <div className="col-12 col-sm-8 col-md-8 col-lg-9 justify-content-center">
                <div className="  col-9 d-flex mt-5">
                    <input
                        className="form-control "
                        id="inputSearch"
                        type="search"
                        placeholder="Search by device"
                        aria-label="search"
                        onChange={searchServiceHandler}
                    />
                </div>
                <h4 className="">List request</h4>

                {!loading &&
                <ServicesList
                    services={tempServices}
                    clickAdd={addHandler}
                    clickField={getUserField}
                />}

            </div>

            <ModalEditUser
                userField={user || undefined}
                clickEdit={sendHandler}
            />

        </div>
    )
}
