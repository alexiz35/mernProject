import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import styled from './AuthPage.module.css'
import CanvasElectro from "../components/CanvasElectro";


export const AuthPage = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })


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


    useEffect(() => {
        error && alert(error)
        clearError()

    }, [error, clearError])



    return (
        <>
            <div>
            <div className={styled.canvas}>
                <CanvasElectro/>
            </div>
            <div className={styled.section}>
                <div className="container">
                    <div className={`row ${styled.fullHeight}  justify-content-center`}>
                        <div className="col-12 text-center align-self-center py-5 ">
                            <div className={styled.section + " pb-5 pt-5 pt-sm-2 text-center"}>
                                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                <input className={styled.checkbox} type="checkbox" id="reg-log" name="reg-log"/>
                                <label htmlFor="reg-log"/>
                                <div className={styled.card3dWrap + " mx-auto"}>
                                    <div className={styled.card3dWrapper}>

                                        <div className={styled.cardFront}>
                                            <div className={styled.centerWrap}>
                                                <div className={styled.section + " text-center"}>
                                                    <h4 className="mb-4 pb-3">Log In</h4>

                                                    <div className={styled.formGroup}>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            className={styled.formStyle}
                                                            placeholder="Your Email"
                                                            value={form.email}
                                                            onChange={changeHandler}
                                                            autoComplete="off"
                                                        />
                                                        <i className={styled.inputIcon + " bi bi-envelope-fill"}/>
                                                    </div>
                                                    <div className={styled.formGroup + " mt-2"}>
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            className={styled.formStyle}
                                                            placeholder="Your Password"
                                                            id="password"
                                                            value={form.password}
                                                            onChange={changeHandler}
                                                            autoComplete="off"
                                                        />
                                                        <i className={styled.inputIcon + " bi bi-key"}/>
                                                    </div>
                                                    <button
                                                        className={styled.btn + " mt-4"}
                                                        disabled={loading}
                                                        onClick={loginHandler}
                                                    >
                                                        Login
                                                    </button>
                                                    {/*<a href="#" className="btn mt-4">submit</a>*/}
                                                    <p className="mb-0 mt-4 text-center"><a href="#0"
                                                                                            className={styled.link}>Forgot
                                                        your password?</a></p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styled.cardBack}>
                                            <div className={styled.centerWrap}>
                                                <div className={styled.section + " text-center"}>
                                                    <h4 className="mb-4 pb-3">Sign Up</h4>
                                                    {/*<div className="form-group">
                                                    <input type="text" name="logname" className="form-style"
                                                           placeholder="Your Full Name" id="logname" autoComplete="off"/>
                                                        <i className="input-icon uil uil-user"/>
                                                </div>*/}
                                                    <div className={styled.formGroup + " mt-2"}>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            className={styled.formStyle}
                                                            placeholder="Your Email"
                                                            id="email"
                                                            value={form.email}
                                                            onChange={changeHandler}
                                                            autoComplete="off"
                                                        />
                                                        <i className={styled.inputIcon + " bi bi-envelope-fill"}/>
                                                    </div>
                                                    <div className={styled.formGroup + " mt-2"}>
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            className={styled.formStyle}
                                                            placeholder="Your Password"
                                                            id="password"
                                                            value={form.password}
                                                            onChange={changeHandler}
                                                            autoComplete="off"
                                                        />
                                                        <i className={styled.inputIcon + " bi bi-key"}/>
                                                    </div>
                                                    <button
                                                        className={styled.btn + " mt-4"}
                                                        disabled={loading}
                                                        onClick={registerHandler}
                                                    >
                                                        Sign Up
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>

    )
}


