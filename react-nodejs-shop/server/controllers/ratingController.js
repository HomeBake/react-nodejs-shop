const {Rating} = require("../models/models");
const ApiError = require("../error/ApiError")

class RatingController {
    async add(req, res, next) {
        try {
            const {deviceId, rating} = req.body
            const newRating = await Rating.upsert({rate: rating, userId: req.user.id, deviceId: deviceId})
            return res.json({newRating})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }
}

module.exports = new RatingController()