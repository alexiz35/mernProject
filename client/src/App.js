import React, {useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";
import "bootstrap"



function App() {
    const {token,login,logout,userId,ready} = useAuth()
    const isAuthenticated = !!token
    const admin = false;
    const routes = useRoutes(isAuthenticated)
    const [getId,setGetId] = useState(null)
    const [user,setUser] = useState(null)
    const [page, setPage] = useState('')



    if (!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token,login,logout, userId, isAuthenticated, admin, getId, setGetId, user, setUser, page, setPage
        }}>
        <Router>
            {isAuthenticated && <Navbar/>}
            <div className="container" >
                {routes}
            </div>
        </Router>
        </AuthContext.Provider>
    );
}

export default App;
