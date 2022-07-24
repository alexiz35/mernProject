import React from "react";
import {Route,Routes} from "react-router-dom";
import {ServicesPage} from "./pages/ServicesPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/Detail";
import {AuthPage} from "./pages/AuthPage";
import {AdminPage} from "./pages/AdminPage";
import {Navigate} from "react-router";
import {UserPage} from "./pages/UserPage";
import {AccessDenied} from "./pages/AccessDenied";


export const useRoutes = (isAuthenticated,admin) => {
    if (isAuthenticated) {
        if (admin) {
            return (
                <Routes>
                    <Route path='/links' element={<ServicesPage/>}/>
                    <Route path='/create' element={<CreatePage/>}/>
                    <Route path='/admin' element={<AdminPage/>}/>
                    <Route path='/detail/:id' element={<DetailPage/>}/>
                </Routes>
            )
        } else {
            return (
                <Routes>
                    <Route path='/user' element={<UserPage/>}/>
                    <Route path='/access' element={<AccessDenied/>}/>
                    <Route path = "/" element={<AuthPage />}/>
                    <Route path="*" element={<Navigate replace to="/access" />} />
                </Routes>
            )
        }
    }
    return (
        <Routes>
            <Route path = "/" element={<AuthPage />}/>
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    )
}