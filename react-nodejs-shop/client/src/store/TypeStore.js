import {makeAutoObservable} from "mobx";

export default class TypeStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Телефоны'},
            {id: 2, name: 'Телевизоры'}
        ]
        makeAutoObservable(this)
    }

    setTypes(array) {
        this._types = array
    }


    get types() {
        return this._types
    }

}