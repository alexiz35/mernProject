import React, {useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import styled from './AuthPage.module.css'
import CanvasElectro from "../components/CanvasElectro";
import {ValidateLabel} from "../components/ValidateLabel";


export const AuthPage = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const passwordRegistration = useRef()

    const patternPassDigit = new RegExp("(?=.*[0-9])")
    const patternPassLower = new RegExp("(?=.*[a-z])")
    const patternPassUpper = new RegExp("(?=.*[A-Z])")
    const patternPassSpecial = new RegExp("(?=.*[!@#$%^&*])")

    const [form, setForm] = useState({
        email: '', password: '', emailRegistration: '', passwordRegistration: ''
    })
    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [hiddenLabel, setHiddenLabel] = useState(true)
    const [validateLabelColor, setValidateLabelColor] = useState({
        colorLength: 'red',
        colorUpper: 'red',
        colorLower: 'red',
        colorSpecial: 'red',
        colorDigit: 'red'
    })
    const [colorEmail, setColorEmail] = useState('#c4c3ca')
    const [colorPassword, setColorPassword] = useState('#c4c3ca')
    const [eyePass, setEyePass] = useState(" bi bi-eye-slash")


    const changeHandler = event => {
        if (event.target.name === 'passwordRegistration') checkPassValidation(event)
        else checkEmailValidation(event)
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleBlur = () => {
        setHiddenLabel(true)
    }

    const handleFocus = () => {
        if (!passwordValid) {
            setHiddenLabel(false)
        }
    }

    const handleViewPass = () => {
        if (passwordRegistration.current.type === 'text') {
            passwordRegistration.current.type = 'password'
            setEyePass(' bi bi-eye-slash')
        } else {
            setEyePass(" bi bi-eye")
            passwordRegistration.current.type = 'text'
        }
    }

    const checkPassValidation = (event) => {
        const target = event.target
        const labelColor = validateLabelColor

        if (target.value === '') {
            setPasswordValid(false)
            setColorPassword('#c4c3ca')
            return
        }

        if (!target.validity.valid) {
            setPasswordValid(false);
            setColorPassword('red');
            setHiddenLabel(false);

            (target.validity.tooShort) ? labelColor.colorLength = 'red' : labelColor.colorLength = 'green';
            (!patternPassDigit.test(event.target.value)) ? labelColor.colorDigit = 'red' : labelColor.colorDigit = 'green';
            (!patternPassLower.test(event.target.value)) ? labelColor.colorLower = 'red' : labelColor.colorLower = 'green';
            (!patternPassUpper.test(event.target.value)) ? labelColor.colorUpper = 'red' : labelColor.colorUpper = 'green';
            (!patternPassSpecial.test(event.target.value)) ? labelColor.colorSpecial = 'red' : labelColor.colorSpecial = 'green';

            setValidateLabelColor(labelColor)
        } else {
            setPasswordValid(true)
            setColorPassword('green')
            setHiddenLabel(true)
        }
    }

    const checkEmailValidation = (event) => {
        const target = event.target

        if (target.value === '') {
            setEmailValid(false)
            setColorEmail('#c4c3ca')
            return
        }

        if (!target.validity.valid) {
            setEmailValid(false);
            setColorEmail('red');
        } else {
            setEmailValid(true)
            setColorEmail('green')
            setHiddenLabel(true)
        }
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
                                                                required
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
                                                        <p className="mb-0 mt-4 text-center"><a href="/"
                                                                                                className={styled.link}>
                                                            Forgot your password?
                                                        </a></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styled.cardBack}>
                                                <div className={styled.centerWrap}>
                                                    <div className={styled.section + " text-center"}>
                                                        <h4 className="mb-4 pb-3">Sign Up</h4>
                                                        <div className={styled.formGroup + " mt-2"}>
                                                            <input
                                                                type="email"
                                                                name="emailRegistration"
                                                                className={styled.formStyle}
                                                                placeholder="Your Email"
                                                                id="emailRegistration"
                                                                value={form.emailRegistration}
                                                                onChange={changeHandler}
                                                                autoComplete="off"
                                                                minLength={3}
                                                                maxLength={100}
                                                                pattern={"^[A-Za-z0-9._-]+@([A-Za-z0-9_-]+)\\.+[A-Za-z]{2,4}$"}
                                                                required
                                                            />
                                                            <i className={styled.inputIcon + " bi bi-envelope-fill"}
                                                               style={{color: colorEmail}}/>
                                                        </div>
                                                        <div className={styled.formGroup + " mt-2"}>
                                                            <input
                                                                ref={passwordRegistration}
                                                                type="password"
                                                                name="passwordRegistration"
                                                                className={styled.formStyle}
                                                                placeholder="Your Password"
                                                                id="passwordRegistration"
                                                                value={form.passwordRegistration}
                                                                onChange={changeHandler}
                                                                onBlur={handleBlur}
                                                                onFocus={handleFocus}
                                                                autoComplete="off"
                                                                formNoValidate
                                                                minLength={6}
                                                                maxLength={12}
                                                                pattern={"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]+$"}
                                                                required 
                                                            />
                                                            <i className={styled.inputIcon + " bi bi-key"}
                                                               style={{color: colorPassword}}/>
                                                            <i className={styled.inputIconEnd + eyePass}
                                                               style={{color: colorPassword}}
                                                               onClick={handleViewPass}
                                                            />
                                                        </div>

                                                        {
                                                            (passwordValid || hiddenLabel) ?

                                                                <button
                                                                    className={styled.btn + " mt-4"}
                                                                    disabled={!passwordValid || !emailValid}
                                                                    onClick={registerHandler}
                                                                >
                                                                    Sign Up
                                                                </button>
                                                                :
                                                                <ValidateLabel
                                                                    validateLabelColor={validateLabelColor}
                                                                />
                                                        }
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


