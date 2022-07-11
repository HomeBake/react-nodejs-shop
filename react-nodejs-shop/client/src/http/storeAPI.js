import {$authHost, $host} from "./index";

const baseURL = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PREFIX

export const fetchDevices = async (typeId, brandId, search, orderBy, limit, page) => {
    const url = new URL(baseURL + process.env.REACT_APP_API_STORE_URL)
    typeId && url.searchParams.append("typeId",typeId)
    brandId && url.searchParams.append("brandId",brandId)
    search && url.searchParams.append("search",search)
    orderBy && url.searchParams.append("orderBy",orderBy)
    limit && url.searchParams.append("limit",limit)
    page && url.searchParams.append("page",page)
    const {data} = await $host.get(url)
    return data.devices
}

export const fetchTypes = async () => {
    const url = new URL(baseURL + process.env.REACT_APP_API_TYPE_URL)
    const {data} = await $host.get(url)
    return data
}

export const fetchBrands = async () => {
    const url = new URL(baseURL + process.env.REACT_APP_API_BRAND_URL)
    const {data} = await $host.get(url)
    return data
}

export const addBrand = async (brandTitle) => {
    const url = new URL(baseURL + process.env.REACT_APP_API_BRAND_URL + 'add')
    const data = await $authHost.post(url, {name: brandTitle})
    return data
}

export const addType = async (typeTitle) => {
    const url = new URL(baseURL + process.env.REACT_APP_API_TYPE_URL + 'add')
    const data = await $authHost.post(url, {name: typeTitle})
    return data
}

export const addDevice = async () => {
    const url = new URL(baseURL + process.env.REACT_APP_API_BRAND_URL + 'add')

}