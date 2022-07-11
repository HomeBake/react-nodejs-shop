import {makeAutoObservable} from "mobx";

export default class FilterStore {
    constructor() {
        this._filters = [
            {
                title: 'По убыванию названия',
                value: 'NAME_DOWN'
            },
            {
                title: 'По возрастанию названия',
                value: 'NAME_UP'
            },
            {
                title: 'По убыванию цены',
                value: 'PRICE_DOWN'
            },
            {
                title: 'По возрастанию цены',
                value: 'PRICE_UP'
            },
            {
                title: 'Без сортировки',
                value: 'DEFAULT'
            }
        ]
        this._selectedFilter = 'DEFAULT'

        makeAutoObservable(this)
    }

    setSelectedFilter(filter) {
        this._selectedFilter = filter
    }

    get selectedFilter() {
        return this._selectedFilter
    }

    get filters() {
        return this._filters
    }

}