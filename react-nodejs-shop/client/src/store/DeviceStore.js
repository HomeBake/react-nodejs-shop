import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._devices = []
        makeAutoObservable(this)
    }

    setDevices(array) {
        this._devices = array
    }


    get devices() {
        return this._devices
    }

}