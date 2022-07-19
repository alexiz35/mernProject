import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {useNavigate} from "react-router";
//import UserCard from "../components/UserCard";
import {UsersList} from "../components/UsersList";
import {UserCard} from "../components/UserCard";


export const AdminPage = () => {

    const navigate = useNavigate()
    const {token, getId, user, setUser, setPage} = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const {loading, request} = useHttp()


    const getUserId = () => {
        const userFiltered = users.filter((value => value._id === getId))
        setUser(userFiltered[0])
    }

    const searchUserHandler = (e) => {
        let search = e.target.value
        let arrEmail = []
        users.map((item) => {
            let itemEmail = item.email
            /*    console.log('1', itemEmail)
                console.log('2', item.email)*/

            if (itemEmail.includes(search)) {
                //arrEmail.push(item.email)

                arrEmail.push(users.filter(value =>  { return value.email === itemEmail}))

                /*console.log('if', arrEmail)*/
            }
        })

        console.log('users1:',arrEmail)
        /*const userFiltered = users.filter((value => value.email === getId))*/
        setUsers(arrEmail)
        console.log('users2:',users)
    }

    /* searchUser(arrEmail,e.target.value);*/


    const searchUser = (user, search) => {
        let result = []
        user.forEach((item) => {
            if (search.includes(item)) {
                return result.push(item)
            }
            return result
        })
        console.log('res', result)
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
            console.log('users:', users)
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
                <input className="form-control " type="search" placeholder="Поиск" aria-label="Поиск"
                       onChange={searchUserHandler}/>
                <button className="btn btn-secondary" type="submit">Поиск</button>
            </div>

            <div className="col-12 col-sm-8 col-md-8 col-lg-9 justify-content-center ">
                <h4 className="text-light">List users</h4>
                <div className=" ">
                    {!loading && <UsersList users={users}/>}
                </div>
            </div>

            <div className=" col-12 col-sm-4 col-md-4 col-lg-3 justify-content-center" style={{marginTop: '75px'}}>

                <UserCard user={user || undefined} clickButton={clickCardHandler}/>

            </div>

        </div>
    )
}
