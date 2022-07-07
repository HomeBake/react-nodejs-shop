import {$authHost, $host} from "./index";


export const fetchDevices = async (typeId, brandId, search, limit, page) => {
    const url = new URL(process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PREFIX + process.env.REACT_APP_API_STORE_URL)
    typeId && url.searchParams.append("typeId",typeId)
    brandId && url.searchParams.append("brandId",brandId)
    search && url.searchParams.append("search",search)
    limit && url.searchParams.append("limit",limit)
    page && url.searchParams.append("page",page)
    const {data} = await $host.get(url)
    return data.devices
}

export const fetchTypes = async () => {
    const url = new URL(process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PREFIX + process.env.REACT_APP_API_TYPE_URL)
    const {data} = await $host.get(url)
    return data
}

export const fetchBrands = async () => {
    const url = new URL(process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PREFIX + process.env.REACT_APP_API_BRAND_URL)
    const {data} = await $host.get(url)
    return data
}