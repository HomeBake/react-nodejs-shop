const {User, Basket} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')


function generateJWT(id, email, role) {
    return jwt.sign(
        {id, email, role},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "24h"}
    )

}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body
            if (!email || !password){
                return next(ApiError.badRequest('Некоректный ввод почты или пароля'))
            }
            if (await User.findOne({where: [{email}]})){
                return next(ApiError.badRequest('Такая почта занята'))
            }
            const hashPassword = await bcrypt.hash(password, 4)
            const user = await User.create({email, password:hashPassword})
            const basket = await Basket.create({userId: user.id})
            const token = generateJWT(user.id, email, user.role)
            return res.json({token})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            if (!email || !password){
                return next(ApiError.badRequest('Некоректный ввод почты или пароля'))
            }
            const user = await User.findOne({where: [{email}]})
            if (!user){
                return next(ApiError.badRequest('Такого пользователя несуществует'))
            }
            const isPassCompare = bcrypt.compareSync(password,user.password)
            if (!isPassCompare){
                return next(ApiError.badRequest('Пароль неверный'))
            }
            const token = generateJWT(user.id, email, user.role)
            return res.json({token})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }

    async checkAuth(req, res, next) {
        try {
            const token = generateJWT(req.user.id, req.user.email, req.user.role)
            return res.json({token})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }
}

module.exports = new UserController()