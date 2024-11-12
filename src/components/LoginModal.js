import React, { useState, useContext } from "react";
import ModalBackground from "./ModalBackground";
import { MODELS_API_AUTH_LOGIN_URL } from '../externApi'
import AuthContext from '../contexts/AuthContext'

const LoginModal = ({ display, setDisplay }) => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [errors, setErrors] = useState({})
    const [isAuth, setIsAuth] = useContext(AuthContext)

    const getErrorStyle = (key) => {
        let obj = { style: { display: 'none' } }
        if (key in errors) {
            obj.style.display = 'block'
        }
        return obj
    }

    const submit = (e) => {
        e.preventDefault()
        if (isAuth){
            return
        }
        let daysUntilExpiration = 1
        if (rememberMe) {
            daysUntilExpiration = 90
        }
        let body = {
            "name": name,
            "password": password,
            "days_until_expiration": daysUntilExpiration
        }
        fetch(MODELS_API_AUTH_LOGIN_URL, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (res.status >= 400) {
                    return res.json()
                }
                else {
                    setDisplay(false)
                    setName('')
                    setPassword('')
                    setRememberMe(false)
                    setIsAuth(true)                
                    return {}
                }
            })
            .then(data => {
                setErrors(data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const backgroundEvents = {
        onClick: (e) =>{
            setDisplay(false)
        }
    }

    return (
        <ModalBackground display={display} setDisplay={setDisplay} backgroundEvents={backgroundEvents}>
            <div className="login-modal" onClick={e => e.stopPropagation()}>
                <div className="div-close-modal">
                    <button className='close-btn' onClick={() => setDisplay(false)}>X</button>
                </div>
                <h1>Log In</h1>
                <form className="basic-form" onSubmit={submit}>
                    <div className="input-div">
                        <label >Name: </label>
                        <div>
                            <input value={name} onChange={e => setName(e.target.value)}></input>
                            <p className="error" {...getErrorStyle('name')}>{errors['name']}</p>
                        </div>
                    </div>
                    <div className="input-div">
                        <label >Password: </label>
                        <div>
                            <input type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
                            <p className="error" {...getErrorStyle('password')}>{errors['password']}</p>
                        </div>
                    </div>
                    <div className="input-div">
                        <label>Remember me: </label>
                        <input className="checkbox" type='checkbox' value={rememberMe} onChange={e => setRememberMe(e.target.value)}></input>
                    </div>
                    <div className="login-modal-submit-div">
                        <button className="basic-btn-2">Log In</button>
                    </div>
                </form>
            </div>
        </ModalBackground>
    )
}

export default LoginModal