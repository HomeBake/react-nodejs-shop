import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._devices = [
            {id: 1, name: 'iPhone 12s+', price: 100000, typeId: 1, brandId: 2, rate: 5, img: "1ecd75fb-cb9a-4523-9b38-6c2130cc36a8.jpg"},
            {id: 2, name: 'Samsung galaxy X mini', price: 50000, typeId: 1, brandId: 1, rate: 4, img: "1ecd75fb-cb9a-4523-9b38-6c2130cc36a8.jpg"},
            {id: 3, name: 'Samsung fridge', price: 20000, typeId: 2, brandId: 1, rate: 5, img: "1ecd75fb-cb9a-4523-9b38-6c2130cc36a8.jpg"},
        ]
        makeAutoObservable(this)
    }

    setDevices(array) {
        this._devices = array
    }


    get devices() {
        return this._devices
    }

}