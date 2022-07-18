import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {UserCard} from "../components/UserCard";

export const CreatePage = () => {
    const navigate = useNavigate()
    const {user,auth} = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')
    const [form,setForm] = useState({
        device:'',claim:'', service:'', cost: null
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })

                navigate(`/detail/${data.link._id}`)
            } catch (e) {
            }
        }
    }
    return (
        <div className="row">
            <div className="col s12 center-align">
                <h1>Create request</h1>
            </div>
            <div className="row">
                <div className="col s12 m4 l3 blue-grey lighten-4">
                    <h4 className="center-align">User card</h4>
                    {user && <UserCard user={user}/>}
                </div>
                <div className="col s12 m8 l9 blue-grey" style={{paddingTop: '2rem'}}>
                    <div className="input-field">
                        <input
                            placeholder="Input Device"
                            id="device"
                            type="text"
                            name="device"
                            className="yellow-input"
                            value={form.device}
                            onChange={changeHandler}
                        />
                        <label htmlFor="device">Input Device</label>
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Input Claim"
                            id="claim"
                            type="text"
                            name="claim"
                            className="yellow-input"
                            value={form.claim}
                            onChange={changeHandler}
                        />
                        <label htmlFor="claim">Input Claim</label>
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Input Service"
                            id="service"
                            type="text"
                            name="service"
                            className="yellow-input"
                            value={form.service}
                            onChange={changeHandler}
                        />
                        <label htmlFor="service">Input Service</label>
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Input Cost"
                            id="cost"
                            type="number"
                            name="cost"
                            className="yellow-input"
                            value={form.cost}
                            onChange={changeHandler}
                        />
                        <label htmlFor="cost">Input Cost</label>
                    </div>
                    <button className="btn waves-effect waves-light">
                        Submit
                    </button>
                </div>

            </div>
        </div>
    )
}