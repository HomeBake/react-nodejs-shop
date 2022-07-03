const {Rating} = require("../models/models");
const ApiError = require("../error/ApiError")
const DeviceService = require("../services/deviceService")

class RatingController {
    async set(req, res, next) {
        try {
            const {deviceId, rate} = req.body
            if (!await DeviceService.isDevice(deviceId)){
                return next(ApiError.badRequest('Такого товара несуществует'))
            }
            const userId = req.user.id
            if (await Rating.findOne({where: [{userId, deviceId}]})) {
               await Rating.destroy({where: [{userId, deviceId}]})
            }
            const newRating = await Rating.create({rate, userId, deviceId})
            return res.json({newRating})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }
}

module.exports = new RatingController()