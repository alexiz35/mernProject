import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {useNavigate} from "react-router";
import {UserCard} from "../components/UserCard";
import {UsersList} from "../components/UsersList";

export const AdminPage = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({
        firstName: '----------',
        lastName: '----------',
        phone: '----------',
        email: '----------',
    })
    const {loading, request} = useHttp()
    const {token,getId} = useContext(AuthContext)


    const getUserId = () => {
        const userFiltered = users.filter((value => value._id === getId))
        setUser(userFiltered[0])
    }

    const clickCardHandler = () => {
        navigate('/links')
    }

    const fetchservices = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUsers(fetched)
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchservices()
    }, [fetchservices])



    useEffect(()=>{
        getUserId()
    },[getId])


    return (
        <div className="row">
            <div className="s12">
                <h1 className="center-align">Admin page</h1>
            </div>

            <div className="col s12 m8 l9 blue-grey lighten-4">
                <h4 className="center-align">List users</h4>
                {!loading && <UsersList users={users}/>}
            </div>

            <div className="col s12 m4 l3 blue-grey lighten-5">
                <h4 className="center-align">User card</h4>
                {user && <UserCard user={user}/>}
                <button className="waves-effect waves-green btn" onClick={clickCardHandler}>
                    Open
                </button>
            </div>
        </div>
    )
}
