import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router";
import {UsersList} from "../components/UsersList";
import {UserCard} from "../components/UserCard";
import {filterTable, getFieldId} from "../components/Function";
import mainStore from '../store/store'
import {setPage2} from '../store/actions'
import {SET_PAGE} from "../store/actionTypes";
import {useDispatch} from "react-redux";
import * as actions from '../store/actions'

export const AdminPage = () => {

    const navigate = useNavigate()
    const {token, getId, user, setUser, setPage} = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [tempUsers, setTempUsers] = useState([])
    const [fieldSearch, setFieldSearch] = useState('email')
    const {loading, request} = useHttp()
    const dispatch = useDispatch()


    const getUserId = () => {
        const userFiltered = users.filter((value => value._id === getId))
        setUser(userFiltered[0])
    }

    const getFieldSearch = (e) => {
        setFieldSearch(getFieldId(e))
    }

    const searchUserHandler = (e) => {
        const search = e.target.value
        if (search === '') {
            return setTempUsers(users)
        }
        setTempUsers(filterTable(users, search, fieldSearch))
    }


    const clickCardHandler = () => {
        navigate('/links')
    }

    const fetchServices = useCallback(async () => {
        try {
            const fetched = await request('/api/user', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUsers(fetched)
            setTempUsers(fetched)
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchServices()
        /*setPage('Admin page')*/
        dispatch(actions.setPage2({
            title:'Admin'
        }))

    }, [fetchServices])


    useEffect(() => {
        getUserId()
    }, [getId])


    return (
        <div className="row mt-5">

            <div className="  col-9 d-flex mt-5">
                <input
                    className="form-control "
                    id="inputSearch"
                    type="search"
                    placeholder="Search by email"
                    aria-label="search"
                    onChange={searchUserHandler}
                />
            </div>

            <div className="col-12 col-sm-12 col-md-8 col-lg-9 justify-content-center mt-1">
                <h4 className="text-light">List users</h4>
                <div className=" ">
                    {!loading && <UsersList
                        users={tempUsers}
                        clickField={getFieldSearch}
                    />}
                </div>
            </div>

            <div className=" col-12 col-sm-12 col-md-4 col-lg-3 justify-content-center mt-5">

                <UserCard
                    user={user || undefined}
                    clickButton={clickCardHandler}
                    button={'Open'}
                />

            </div>

        </div>
    )
}
