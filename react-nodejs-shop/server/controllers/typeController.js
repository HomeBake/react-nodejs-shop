const {Type} = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
    async add(req, res, next) {
        try {
            const {name} = req.body
            const isExist = await Type.findOne({
                where: {name}
            })
            if (isExist)
            {
                return next(ApiError.invalidData({message: 'Такой тип уже существует'}))
            }
            const type = await Type.create({name})
            return res.json(type)
        }
        catch (e) {
            return  next(ApiError.serverError())
        }
    }

    async delete(req, res, next) {
        try {
            const {typeId} = req.query
            const deletedType = await Type.destroy({
                where: {id: typeId}
            })
            return res.json(deletedType)
        }
        catch (e) {
            return  next(ApiError.serverError())
        }
    }

    async get(req, res, next) {
        try {
            const types = await Type.findAll()
            return res.json(types)
        }
        catch (e) {
            return  next(ApiError.serverError())
        }
    }
}

module.exports = new TypeController()