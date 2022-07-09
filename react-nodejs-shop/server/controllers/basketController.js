const {Basket, BasketDevice, Device} = require('../models/models')
const DeviceService = require("../services/deviceService")
const ApiError = require('../error/ApiError')

class BasketController {
    async add(req, res, next) {
        const {deviceId} = req.body
        const userId = req.user.id
        let userBasket = await Basket.findOne({where: [{userId}]})
        if (!await DeviceService.isDevice(deviceId)) {
            return next(ApiError.invalidData('Такого товара не существует'))
        }
        if (!userBasket) {
            const basket = await Basket.create({userId})
            userBasket = basket.id
        }
        if (await BasketDevice.findOne({where: [{deviceId, basketId: userBasket.id}]})) {
            return next(ApiError.invalidData('Товар уже в корзине'))
        }
        try {
            const basketDevice = await BasketDevice.create({deviceId, basketId: userBasket.id})
            return res.json({basketDevice})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }

    async delete(req, res, next) {
        const {deviceId} = req.query
        const userId = req.user.id
        let userBasket = await Basket.findOne({where: [{userId}]})
        if (!userBasket) {
            const basket = await Basket.create({userId})
            userBasket = basket.id
        }
        if (!await DeviceService.isDevice(deviceId)) {
            return next(ApiError.invalidData('Такого товара не существует'))
        }
        try {
            const basketDevice = await BasketDevice.destroy({
                where: {deviceId, basketId: userBasket.id}
            })
            return res.json(basketDevice)
        } catch (e) {
            return next(ApiError.serverError())
        }

    }

    async get(req, res, next) {
        const userId = req.user.id
        try {
            const userBasket = await Basket.findAll({
                include: {model: BasketDevice, required: false, include: {model: Device}},
                where: {userId}
            })
            const devices = []
            userBasket[0].basket_devices.forEach((device) => {
                    devices.push(device.device)
                }
            )
            return res.json({devices})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }
}

module.exports = new BasketController()