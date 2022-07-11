const {Device, Type, Brand, Rating} = require("../models/models");
const {Op, Sequelize} = require("sequelize");

const ORDER = {
    DEFAULT: ['id'],
    NAME_DOWN: ['name'],
    NAME_UP: ['name', 'DESC'],
    PRICE_DOWN: ['price'],
    PRICE_UP: ['price', 'DESC'],
}

class DeviceService {


    static isDevice(deviceId) {
        return Device.findByPk(deviceId)
    }
    static isType(typeId) {
        return Type.findByPk(typeId)
    }
    static isBrand(brandId) {
        return Brand.findByPk(brandId)
    }
    static isDeviceName(name){
        return Device.findOne({where: [{name}]})
    }

    static async getDevices(typeId, brandId, search, orderBy, limit, page) {
        orderBy = ORDER[orderBy] || ORDER['DEFAULT']
        limit = limit || 9
        page = page || 1
        search = search || ''
        let offset = page * limit - limit
        let devices
        
        if (!typeId && !brandId) {
            devices = await Device.findAndCountAll({
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                attributes: ['id', 'name', 'price', 'img', 'brandId', 'typeId'],
                include: {
                    model: Rating,
                    as: 'ratings',
                    attributes: [[Sequelize.fn('AVG', Sequelize.col('ratings.rate')), 'AVGrate']],
                    duplicating: false
                },
                group: [Sequelize.col('device.id'), Sequelize.col('ratings.deviceId')],
                limit: limit,
                offset: offset,
                raw: true,
                order: [orderBy]
            })
        }
        if (typeId && !brandId) {
            devices = await Device.findAndCountAll({
                attributes: ['id', 'name', 'price', 'img', 'brandId', 'typeId'],
                where: {
                    typeId, name: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                include: {
                    model: Rating,
                    as: 'ratings',
                    attributes: [[Sequelize.fn('AVG', Sequelize.col('ratings.rate')), 'AVGrate']],
                    duplicating: false
                },
                group: [Sequelize.col('device.id'), Sequelize.col('ratings.deviceId')],
                limit: limit,
                offset: offset,
                raw: true,
                order: [orderBy]
            })
        }
        if (!typeId && brandId) {
            devices = await Device.findAndCountAll({
                where: {
                    brandId,
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                attributes: ['id', 'name', 'price', 'img', 'brandId', 'typeId'],
                include: {
                    model: Rating,
                    as: 'ratings',
                    attributes: [[Sequelize.fn('AVG', Sequelize.col('ratings.rate')), 'AVGrate']],
                    duplicating: false
                },
                group: [Sequelize.col('device.id'), Sequelize.col('ratings.deviceId')],
                limit: limit,
                offset: offset,
                raw: true,
                order: [orderBy]
            })
        }
        if (typeId && brandId) {
            devices = await Device.findAndCountAll({
                where: {
                    typeId,
                    brandId,
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                attributes: ['id', 'name', 'price', 'img', 'brandId', 'typeId'],
                include: {
                    model: Rating,
                    attributes: [[Sequelize.fn('AVG', Sequelize.col('ratings.rate')), 'AVGrate']],
                    duplicating: false
                },
                group: [Sequelize.col('device.id'), Sequelize.col('ratings.deviceId')],
                limit: limit,
                offset: offset,
                raw: true,
                order: [orderBy]
            })
        }
        return devices
    }
}

module.exports = DeviceService