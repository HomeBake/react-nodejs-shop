import {$authHost, $host} from "./index";

const url = process.env.REACT_APP_API_PREFIX + process.env.REACT_APP_API_DEVICE_URL

export const fetchDevice = async (id) => {
    const res = await $host.get(url + id)
    return res.data
}

export const createDevice = async (device) => {
    const res = await $authHost.post(url + 'add', device)
    return res

}

export const isDeviceInBasket = async (id) => {
    const res = await $authHost.post(url + id)
    return res.data
}

export const setDeviceRating = async (id,rating) => {
    const res = await $authHost.post(process.env.REACT_APP_API_PREFIX + process.env.REACT_APP_API_RATING_URL + 'set',
        {
            deviceId:id,
            rate: rating
        })
}
