import React, { useState, useContext } from "react"
import SearchBar from "./SearchBar"
import AuthContext from "../contexts/AuthContext"

const Nav = ({ setId, setDisplayLogin, setDisplayRegister, setDisplayUserRoutes}) => {

    const [isAuth, setIsAuth] = useContext(AuthContext)

    return (
        <>
            <div id="nav-wrapper">
                <nav id="nav-main">
                    <h1>Book recommendations</h1>
                    <div id="nav-main-right">
                        {isAuth === false ?
                            <>
                                <button className="basic-btn" onClick={() => setDisplayLogin(true)}>Login</button>
                                <button className="basic-btn" onClick={() => setDisplayRegister(true)}>Register</button>
                            </>
                            :
                            <>
                                <button className="basic-btn" onClick={() => setDisplayUserRoutes(true)}>Profile</button>
                            </>
                        }
                    </div>
                </nav>
                <nav id="nav-search">
                    <SearchBar setId={setId}></SearchBar>
                </nav>
            </div>
        </>
    )
}

export default Nav