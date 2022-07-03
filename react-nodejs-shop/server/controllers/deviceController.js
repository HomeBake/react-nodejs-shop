const uuid = require("uuid")
const path = require("path")
const {Device, DeviceInfo, Type, Brand} = require("../models/models")
const ApiError = require("../error/ApiError")

async function isType(typeId) {
    return Type.findByPk(typeId)
}

async function isBrand(brandId) {
    return Brand.findByPk(brandId)
}

class DeviceController {
    async add(req, res, next) {
       try {
           let {name, price, brandId, typeId, info} = req.body
           if (!await isType(typeId) || await isBrand(brandId)){
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
           return next(ApiError.serverError())
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
        const {id} = req.params
        const device = await Device.findByPk(id, {include: [{model: DeviceInfo, as: 'device_info'}]})
        return res.json({device})
    }
}

module.exports = new DeviceController()