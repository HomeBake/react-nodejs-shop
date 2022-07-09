import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._basketDevices = []
        makeAutoObservable(this)
    }

    setBasketDevices(array) {
        this._basketDevices = array
    }


    get basketDevices() {
        return this._basketDevices
    }

}