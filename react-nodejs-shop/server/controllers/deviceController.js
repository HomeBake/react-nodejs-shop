const uuid = require("uuid")
const path = require("path")
const {Device, DeviceInfo, Type, Brand, Basket, BasketDevice, Rating} = require("../models/models")
const ApiError = require("../error/ApiError")
const DeviceService = require("../services/deviceService")
const {Op, Sequelize} = require("sequelize");


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
            const {img} = req.files
            const fileName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
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
            let {typeId, brandId, search, limit, page} = req.query
            limit = limit || 100
            page = page || 1
            search = search || ''
            let offset = page * limit - limit
            let devices
            if (!typeId && !brandId) {
                devices = await Device.findAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    attributes: ['id','name', 'price', 'img', 'brandId', 'typeId'],
                    include: {
                        model: Rating,
                        as: 'ratings',
                        attributes: [[Sequelize.fn('AVG',Sequelize.col('ratings.rate')),'AVGrate']],
                        duplicating: false
                    },
                    group: [Sequelize.col('device.id'),Sequelize.col('ratings.deviceId')],
                    limit: limit,
                    offset: offset,
                    raw: true,
                })
            }
            if (typeId && !brandId) {
                devices = await Device.findAll({
                    attributes: ['id','name', 'price', 'img', 'brandId', 'typeId'],
                    where: {
                        typeId, name: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    include: {
                        model: Rating,
                        as: 'ratings',
                        attributes: [[Sequelize.fn('AVG',Sequelize.col('ratings.rate')),'AVGrate']],
                        duplicating: false
                    },
                    group: [Sequelize.col('device.id'),Sequelize.col('ratings.deviceId')],
                    limit: limit,
                    offset: offset,
                    raw: true,
                })
            }
            if (!typeId && brandId) {
                devices = await Device.findAll({
                    where: {
                        brandId,
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    attributes: ['id','name', 'price', 'img', 'brandId', 'typeId'],
                    include: {
                        model: Rating,
                        as: 'ratings',
                        attributes: [[Sequelize.fn('AVG',Sequelize.col('ratings.rate')),'AVGrate']],
                        duplicating: false
                    },
                    group: [Sequelize.col('device.id'),Sequelize.col('ratings.deviceId')],
                    limit: limit,
                    offset: offset,
                    raw: true,
                })
            }
            if (typeId && brandId) {
                devices = await Device.findAll({
                    where: {
                        typeId,
                        brandId,
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    attributes: ['id','name', 'price', 'img', 'brandId', 'typeId'],
                    include: {
                        model: Rating,
                        attributes: [[Sequelize.fn('AVG',Sequelize.col('ratings.rate')),'AVGrate']],
                        duplicating: false
                    },
                    group: [Sequelize.col('device.id'),Sequelize.col('ratings.deviceId')],
                    limit: limit,
                    offset: offset,
                    raw: true,
                })
            }
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
                        [{model: DeviceInfo}]
                })
            return res.json({device})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }


    async isInBasket(req, res, next) {
        const userId = req.user.id
        const {id} = req.params
        try {
            const userBasket = await Basket.findAll({
                include: [{model: BasketDevice, required: false, include:[{model: Device, where:{id}}] }],
                where: {userId}
            })
            return res.json({isInBasket: userBasket[0].basket_devices.length})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }
}

module.exports = new DeviceController()