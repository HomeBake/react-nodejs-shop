import Admin from "./pages/Admin"
import Basket from "./pages/Basket"
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, STORE_ROUTE} from "./utils/constant"
import Auth from "./pages/Auth";
import Device from "./pages/Device";
import Store from "./pages/Store";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin/>
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <Auth/>
    },
    {
        path: REGISTER_ROUTE,
        element: <Auth/>
    },
    {
        path: DEVICE_ROUTE + '/:id',
        element: <Device/>
    },
    {
        path: STORE_ROUTE,
        element: <Store/>
    },
    {
        path: BASKET_ROUTE,
        element: <Basket/>
    },
]