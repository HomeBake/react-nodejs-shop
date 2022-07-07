import {$authHost, $host} from "./index";


export const register = async (email, password) => {
    const res = await $host.post(process.env.REACT_APP_API_PREFIX + process.env.REACT_APP_API_USER_URL + "register", {email, password})
    return res
}

export const login = async (email, password) => {
    const res = await $host.post(process.env.REACT_APP_API_PREFIX + process.env.REACT_APP_API_USER_URL + "login", {email, password})
    return res

}

export const check = async () => {
    const res = await $host.get(process.env.REACT_APP_API_PREFIX + process.env.REACT_APP_API_USER_URL + "check")
    return res
}