const uuid = require("uuid")
const path = require("path")
const {Device, DeviceInfo, Type, Brand} = require("../models/models")
const ApiError = require("../error/ApiError")
const DeviceService = require("../services/deviceService")



class DeviceController {
    async add(req, res, next) {
       try {
           let {name, price, brandId, typeId, info} = req.body
           if (await DeviceService.isDeviceName(name))
           {
               return next(ApiError.badRequest("Товар с таким именем существует"))
           }
           if (!await DeviceService.isType(typeId) ||
               !await DeviceService.isBrand(brandId)){
               return next(ApiError.badRequest("Тип или бренд несуществует"))
           }
           const {img} = req.files
           const fileName = uuid.v4() + '.jpg'
           await img.mv(path.resolve(__dirname, '..', 'static', fileName))
           const device = await Device.create({name, price, brandId, typeId, img:  fileName})
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
            let {typeId,brandId, limit, page} = req.query
            limit = limit || 3
            page = page || 1
            let offset = page * limit - limit
            let devices
            if (!typeId && !brandId){
                devices = await Device.findAll({limit, offset})
            }
            if (typeId && !brandId) {
                devices = await Device.findAll({where: {typeId}, limit, offset})
            }
            if (!typeId && brandId) {
                devices = await Device.findAll({where: {brandId}, limit, offset})
            }
            if (typeId && brandId) {
                devices = await Device.findAll({where: {typeId,brandId}, limit, offset})
            }
            return res.json({devices})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            if (!await DeviceService.isDevice(id))
            {
                return next(ApiError.badRequest("Такого товара нет"))
            }
            const device = await Device.findByPk(id, {include: [{model: DeviceInfo, as: 'device_info'}]})
            return res.json({device})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }
}

module.exports = new DeviceController()