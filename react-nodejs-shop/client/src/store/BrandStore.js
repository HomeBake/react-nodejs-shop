import {makeAutoObservable} from "mobx";

export default class BrandStore {
    constructor() {
        this._brands = [
            {id: 1, name: 'Samsung'},
            {id: 2, name: 'Apple'},
            {id: 3, name: 'Dell'}
        ]
        makeAutoObservable(this)
    }

    setBrands(array) {
        this._brands = array
    }

    get brands() {
        return this._brands
    }

}