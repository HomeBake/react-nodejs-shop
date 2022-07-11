import {makeAutoObservable} from "mobx";

export default class PageStore {

    constructor() {
        this._page = 1
        this._itemTotal = 3
        this._limit = 9
        this._paginationType = 0
        makeAutoObservable(this)
    }

    get limit() {
        return this._limit;
    }

    setLimit(value) {
        this._limit = value;
    }
    get itemTotal() {
        return this._itemPage;
    }

    setItemTotal(value) {
        this._itemPage = value;
    }

    get page() {
        return this._page;
    }

    setPage(value) {
        this._page = value;
    }

    get paginationType() {
        return this._paginationType;
    }

    setPaginationType(value) {
        this._paginationType = value;
    }

}