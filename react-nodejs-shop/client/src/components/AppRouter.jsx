import React, {useContext} from 'react';
import {Routes, Route} from "react-router-dom"
import {authRoutes, publicRoutes} from "../routes"
import {Context} from "../index";

const AppRouter = () => {
    const {userStore} = useContext(Context)
    return (
        <Routes>
            {userStore.isAuth === true && authRoutes.map(({path,element}) =>
                <Route key={path} path={path} element={element}/>
            )}
            {publicRoutes.map(({path,element}) =>
                <Route key={path} path={path} element={element}/>
            )}
        </Routes>
    );
};

export default AppRouter;