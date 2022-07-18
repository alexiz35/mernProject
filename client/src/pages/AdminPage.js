import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {useNavigate} from "react-router";
import {UserCard} from "../components/UserCard";
import {UsersList} from "../components/UsersList";

export const AdminPage = () => {
    const navigate = useNavigate()
    const {token,getId,user,setUser} = useContext(AuthContext)
    const [users, setUsers] = useState([])
    /*const [user, setUser] = useState({
        firstName: '----------',
        lastName: '----------',
        phone: '----------',
        email: '----------',
    })*/
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
    }, [fetchservices])



    useEffect(()=>{
        getUserId()
    },[getId])


    return (
        <div className="row">
            <div className="col-12  ">
                <h1 className="">Admin page</h1>
            </div>

            <div className="col-12 col-sm-8 col-md-8 col-lg-9 justify-content-center">
                <h4 className="center-align">List users</h4>
                {!loading && <UsersList users={users}/>}
            </div>

            <div className=" col-12 col-sm-4 col-md-4 col-lg-3 " style={{marginTop: '75px'}}>

                {user && <UserCard user={user}/>}
                <button className="waves-effect waves-green btn" onClick={clickCardHandler}>
                    Open
                </button>

            </div>
        </div>
    )
}
