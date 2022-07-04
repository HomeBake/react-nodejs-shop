import {makeAutoObservable} from "mobx";

export default class TypeStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Телефоны'},
            {id: 2, name: 'Телевизоры'}
        ]
        this._selectedType = 0
        makeAutoObservable(this)
    }

    setTypes(array) {
        this._types = array
    }
    setSelectedType(type) {
        this._selectedType= type
    }

    get types() {
        return this._types
    }
    get selectedType() {
        return this._selectedType
    }

}