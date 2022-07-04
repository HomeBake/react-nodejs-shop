import React from 'react';
import {Routes, Route} from "react-router-dom"
import {authRoutes, publicRoutes} from "../routes"

const AppRouter = () => {
    const isAuth = true
    return (
        <Routes>
            {isAuth === true && authRoutes.map(({path,element}) =>
                <Route path={path} element={element}/>
            )}
            {publicRoutes.map(({path,element}) =>
                <Route path={path} element={element}/>
            )}
        </Routes>
    );
};

export default AppRouter;