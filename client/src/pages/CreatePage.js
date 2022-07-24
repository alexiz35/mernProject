import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {UserCard} from "../components/UserCard";

export const CreatePage = () => {
    const navigate = useNavigate()
    const {user,setPage,token} = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')
    const [form,setForm] = useState({
        device:'',claim:'', service:'', cost: null
    })


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const pressHandler = async () => {
        /*if (event.key === 'Enter') {*/
            try {
                console.log('try')
                const data = await request('/api/service/generate','POST', {form,user}, {
                    Authorization: `Bearer ${token}`
                })
                navigate(`/detail/${data.service._id}`)
            } catch (e) {
            }

    }

    useEffect(() => {
        setPage('Add request')
    }, [])

    return (
        <div className="row">
            <div className="col s12 center-align">
                <h1>Create request</h1>
            </div>
            <div className="row">
                <div className="col-12 col-md-4 ">
                    <h4 className="center-align">User card</h4>
                    {user && <UserCard user={user}/>}
                </div>
                <div className="col-12 col-md-6" style={{paddingTop: '2rem'}}>
                    <div className="form-floating mb-3">
                        <input
                            placeholder="Input Device"
                            id="device"
                            type="text"
                            name="device"
                            className="form-control"
                            value={form.device}
                            onChange={changeHandler}
                        />
                        <label htmlFor="device">Input Device</label>
                    </div>
                    <div className="form-floating mb-3" >
                        <input
                            placeholder="Input Claim"
                            id="claim"
                            type="text"
                            name="claim"
                            className="form-control"
                            value={form.claim}
                            onChange={changeHandler}
                        />
                        <label htmlFor="claim">Input Claim</label>
                    </div>
                    <div className="form-floating mb-3" >
                        <input
                            placeholder="Input Service"
                            id="service"
                            type="text"
                            name="service"
                            className="form-control"
                            value={form.service}
                            onChange={changeHandler}
                        />
                        <label htmlFor="service">Input Service</label>
                    </div>
                    <div className="form-floating mb-3"  >
                        <input
                            placeholder="Input Cost"
                            id="cost"
                            type="number"
                            name="cost"
                            className="form-control"
                            value={form.cost}
                            onChange={changeHandler}
                        />
                        <label htmlFor="cost">Input Cost</label>
                    </div>
                    <button className="btn-lg btn-dark" onClick={pressHandler} >
                        Submit
                    </button>
                </div>

            </div>
        </div>
    )
}