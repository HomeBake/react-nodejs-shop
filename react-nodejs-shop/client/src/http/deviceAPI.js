import {$authHost, $host} from "./index";


export const fetchDevice = async (id) => {
    const res = await $host.get(process.env.REACT_APP_API_PREFIX + process.env.REACT_APP_API_DEVICE_URL + id)
    return res.data.device
}

