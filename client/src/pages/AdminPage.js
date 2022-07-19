import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {useNavigate} from "react-router";
import {UserCard} from "../components/UserCard";
import {UsersList} from "../components/UsersList";

export const AdminPage = () => {
    const navigate = useNavigate()
    const {token, getId, user, setUser, setPage} = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const {loading, request} = useHttp()


    const getUserId = () => {
        const userFiltered = users.filter((value => value._id === getId))
        setUser(userFiltered[0])
    }

    const clickCardHandler = () => {
        navigate('/links')
    }

    const fetchservices = useCallback(async () => {
        try {
            const fetched = await request('/api/user', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUsers(fetched)
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchservices()
        setPage('Admin page')
    }, [fetchservices])


    useEffect(() => {
        getUserId()
    }, [getId])


    return (
        <div className="row">
            <div className=" col-9 d-flex " style={{marginTop: '50px'}}>
                <input className="form-control " type="search" placeholder="Поиск" aria-label="Поиск"/>
                <button className="btn btn-secondary" type="submit">Поиск</button>
            </div>

            <div className="col-12 col-sm-8 col-md-8 col-lg-9 justify-content-center ">
                <h4 className="text-light">List users</h4>
                <div className=" ">
                    {!loading && <UsersList users={users}/>}
                </div>
            </div>

            <div className=" col-12 col-sm-4 col-md-4 col-lg-3 justify-content-center" style={{marginTop: '75px'}}>

                {user && <UserCard user={user}/>}
                <div className="row justify-content-center">
                    <div className=" ">
                        <button className="col-12 btn btn-secondary" onClick={clickCardHandler}>
                            Open
                        </button>

                    </div>
                </div>
            </div>
        </div>
)
}
