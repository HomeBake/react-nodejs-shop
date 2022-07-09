import {$authHost} from "./index";

const url = process.env.REACT_APP_API_PREFIX + process.env.REACT_APP_API_BASKET_URL

export const fetchBasket = async () => {
    const res = await $authHost.get(url)
    return res.data.devices
}

export const addBasketDevice = async (deviceId) => {
    const res = await $authHost.post(url + 'add', {deviceId})
    return res.data
}

export const deleteBasketDevice = async (deviceId) => {
    const res = await $authHost.delete(url + 'delete',{params: {deviceId}})
    console.log(res)
    return res.data
}
