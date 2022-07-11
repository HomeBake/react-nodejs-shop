import {$authHost, $host} from "./index";

const url = process.env.REACT_APP_API_PREFIX + process.env.REACT_APP_API_USER_URL

export const register = async (email, password) => {
    const res = await $host.post(url + "register", {email, password})
    return res
}

export const login = async (email, password) => {
    const res = await $host.post(url + "login", {email, password})
    return res

}

export const check = async () => {
    const res = await $authHost.get(url + "check")
    return res.data
}

export const changeRole = async () => {
    const res = await $authHost.get(url + "changeRole")
    return res.data
}