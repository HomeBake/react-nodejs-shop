const {Type} = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
    async add(req, res) {
        try {
            const {name} = req.body
            const isExist = await Type.findOne({
                where: {name}
            })
            if (isExist)
            {
                return res.json({message: 'Такой тип уже существует'})
            }
            const type = await Type.create({name})
            return res.json(type)
        }
        catch (e) {
            return  res.json(ApiError.serverError())
        }
    }

    async delete(req, res) {
        try {
            const {typeId} = req.query
            const deletedType = await Type.destroy({
                where: {id: typeId}
            })
            return res.json(deletedType)
        }
        catch (e) {
            return  res.json(ApiError.serverError())
        }
    }

    async get(req, res) {
        try {
            const types = await Type.findAll()
            return res.json(types)
        }
        catch (e) {
            return  res.json(ApiError.serverError())
        }
    }
}

module.exports = new TypeController()