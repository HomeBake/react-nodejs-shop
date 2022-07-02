const {Basket,BasketDevice} = require('../models/models')

const ApiError = require('../error/ApiError')

class BasketController {
    async add(req, res) {
        const {deviceId} = req.body

    }

    async delete(req, res) {
        const {deviceId} = req.query
        const basketDevice = await BasketDevice.destroy({
            where: {basketId: deviceId}
        })
        return res.json(basketDevice)
    }

    async get(req, res) {
        const userBasket = await Basket.findAll({
            include: {model: BasketDevice, required: true},
            where: {userId: id}
        })
    }
}

module.exports = new BasketController()