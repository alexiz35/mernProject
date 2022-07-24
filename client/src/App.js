import React, {useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";
import "bootstrap"



function App() {
    const {token,login,logout,userId,ready,admin} = useAuth()
    const isAuthenticated = !!token
    const [getId,setGetId] = useState(null)
    const [user,setUser] = useState(null)
    const [page, setPage] = useState('')
    const routes = useRoutes(isAuthenticated,admin)



    if (!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token,login,logout, userId, isAuthenticated, admin, getId, setGetId, user, setUser, page, setPage
        }}>
        <Router>
            {isAuthenticated && <Navbar admin={admin}/>}
            <div className="container" >
                {routes}
            </div>
        </Router>
        </AuthContext.Provider>
    );
}

export default App;
