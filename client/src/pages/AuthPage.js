import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        error && alert(error)
        clearError()

    }, [error, clearError])


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            alert(data.message)
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.admin)
            data.admin ? navigate('/admin') : navigate('/user')
        } catch (e) {

        }
    }

    return (
        <div className="row d-flex justify-content-center" style={{marginTop: '100px'}}>
            <div className="col-7 ">
                <h1>Auth page</h1>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={changeHandler}
                    />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={changeHandler}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="mt-4" >
                    <button
                        className="btn-dark btn me-3 col-12"
                        /*style={{marginRight: 10}}*/
                        disabled={loading}
                        onClick={loginHandler}
                    >
                        Login
                    </button>
                    <button
                        className={"btn-dark btn me-3 col-12 mt-3"}
                        onClick={registerHandler}
                        disabled={loading}
                    >
                        Registration
                    </button>
                </div>
            </div>

        </div>
    )
}