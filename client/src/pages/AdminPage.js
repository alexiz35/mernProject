import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {useNavigate} from "react-router";
//import UserCard from "../components/UserCard";
import {UsersList} from "../components/UsersList";
import {UserCard} from "../components/UserCard";
import {type} from "@testing-library/user-event/dist/type";


export const AdminPage = () => {

    const navigate = useNavigate()
    const {token, getId, user, setUser, setPage,logout} = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [tempUsers, setTempUsers] = useState([])
    const [fieldUsers, setFieldUsers] = useState('email')
    const {loading, request} = useHttp()


    const getUserId = () => {
        const userFiltered = users.filter((value => value._id === getId))
        setUser(userFiltered[0])
    }

    const getUserField = (e) => {
        const styleColTable = e.target.className
        const headTable = document.getElementsByTagName("th")
        const input = document.getElementById("inputSearch")
        input.placeholder = `Search by ${e.target.id}`

        for (let i=0;i<headTable.length;i++){
            headTable[i].className = ''
        }
        e.target.className = 'bg-secondary'
        setFieldUsers(e.target.id)
        input.focus()
    }

    const searchUserHandler = (e) => {
        const search = e.target.value
        if (search === '') {
            return setTempUsers(users)
        }
        setTempUsers(filterUser(users, search,fieldUsers))
    }


    const filterUser = (users, search, fieldUser) => {
        let arrUsers = []
        let tempArr = {}

        users.map((item) => {
            const itemType = item[fieldUser]
            const itemId = item._id
            if (itemType.includes(search)) {
                tempArr = {...users.filter(value => {return value._id === itemId })
                }
                arrUsers.push(tempArr[0])
            }
        })
        return arrUsers
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
            setTempUsers(fetched)
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

            <div className="  col-9 d-flex " style={{marginTop: '50px'}}>
                <input className="form-control " id="inputSearch" type="search" placeholder="Search by email" aria-label="search"
                       onChange={searchUserHandler} />
            </div>

            <div className="col-12 col-sm-12 col-md-8 col-lg-9 justify-content-center ">
                <h4 className="text-light">List users</h4>
                <div className=" ">
                    {!loading && <UsersList users={tempUsers} clickField={getUserField}/>}
                </div>
            </div>

            <div className=" col-12 col-sm-12 col-md-4 col-lg-3 justify-content-center" style={{marginTop: '75px'}}>

                <UserCard user={user || undefined} clickButton={clickCardHandler} button={'Open'}/>

            </div>

        </div>
    )
}
