import React from "react";
import {Route,Routes} from "react-router-dom";
import {ServicesPage} from "./pages/ServicesPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/Detail";
import {AuthPage} from "./pages/AuthPage";
import {AdminPage} from "./pages/AdminPage";


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path='/links' element={<ServicesPage/>}/>
                <Route path='/create' element={<CreatePage />}/>
                <Route path='/admin' element={<AdminPage />}/>
                <Route path='/detail/:id' element={<DetailPage />}/>
                {/*<Route path='*' element={<CreatePage />}/>*/}
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path = "/" element={<AuthPage/>}/>
           {/*<Redirect to="/"/>*/}
        </Routes>
    )
}