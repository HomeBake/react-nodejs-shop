const uuid = require("uuid")
const path = require("path")
const {Device, DeviceInfo, Type, Brand, Basket, BasketDevice, Rating} = require("../models/models")
const ApiError = require("../error/ApiError")
const DeviceService = require("../services/deviceService")
const {Op, Sequelize} = require("sequelize");
const deviceService = require("../services/deviceService");


class DeviceController {
    async add(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            if (await DeviceService.isDeviceName(name)) {
                return next(ApiError.invalidData("Товар с таким именем существует"))
            }
            if (!await DeviceService.isType(typeId) ||
                !await DeviceService.isBrand(brandId)) {
                return next(ApiError.invalidData("Тип или бренд несуществует"))
            }
            const fileName = uuid.v4() + '.jpg'
            try {
                const {img} = req.files
                await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            } catch (e) {

            }
            const device = await Device.create({name, price, brandId, typeId, img: fileName})
            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id,
                    })
                })
            }
            return res.json({device})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {

    }

    async get(req, res, next) {
        try {
            let {typeId, brandId, search, limit, page, orderBy} = req.query
            const devices = await deviceService.getDevices(typeId, brandId, search, orderBy, limit, page)
            return res.json({devices})
        } catch (e) {
            console.log(e.message)
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            if (!await DeviceService.isDevice(id)) {
                return next(ApiError.badRequest("Такого товара нет"))
            }
            const device = await Device.findByPk(
                id,
                {
                    include:
                        [
                            {
                                model: DeviceInfo
                            }
                        ]
                })
            const rate = await Rating.findAll({
                where: {
                        deviceId: id
                    },
                attributes: [[Sequelize.fn('AVG',Sequelize.col('rate')),'AVGrate']]
            })
            return res.json({device,rate})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }


    async getUserDeviceInfo(req, res, next) {
        try {
            const {id} = req.params
            const userId = req.user.id
            if (!await DeviceService.isDevice(id)) {
                return next(ApiError.badRequest("Такого товара нет"))
            }
            let userRate
            let userBasket
            try {
                userRate = await Rating.findOne({
                    where: {
                        deviceId: id,
                        userId: userId,
                    },
                    attributes: ['rate'],
                })
            } catch (e) {
                return next(ApiError.invalidData('У товара нет отзывов'))
            }
            try {
                userBasket = await Basket.findAll({
                    include: [{
                        model: BasketDevice,
                        required: false,
                        include: [{
                            model: Device,
                            where: {id },
                        },
                        ],
                    }],
                    where: {userId}
                })
            } catch (e) {
                return next(ApiError.invalidData('Товар не добавляли в корзину'))
            }
            return res.json({userRate: userRate.rate,isInBasket: userBasket[0].basket_devices.length})
        } catch (e) {
            return next(ApiError.invalidData('У товара нет отзывов'))
        }
    }
}

module.exports = new DeviceController()