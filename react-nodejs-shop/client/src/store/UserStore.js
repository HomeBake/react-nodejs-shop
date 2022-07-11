import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._userRole = 'USER'
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
        this.setUserRole(user.role)
    }
    setUserRole(userRole) {
        this._userRole = userRole
    }

    resetUser() {
        this._user = {}
    }

    get userRole() {
        return this._userRole
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}