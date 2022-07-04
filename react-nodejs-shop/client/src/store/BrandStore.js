import {makeAutoObservable} from "mobx";

export default class BrandStore {
    constructor() {
        this._brands = [
            {id: 1, name: 'Samsung'},
            {id: 2, name: 'Apple'},
            {id: 3, name: 'Dell'}
        ]
        this._selectedBrand = 0
        makeAutoObservable(this)
    }

    setBrands(array) {
        this._brands = array
    }
    setSelectedBrand(brand) {
        this._selectedBrand= brand
    }

    get brands() {
        return this._brands
    }
    get selectedBrand() {
        return this._selectedBrand
    }

}