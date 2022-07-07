const {Brand} = require('../models/models')

const ApiError = require('../error/ApiError')

class BrandController {
    async add(req, res, next) {
        try {
            const {name} = req.body
            const isExist = await Brand.findOne({
                where: {name}
            })
            if (isExist)
            {
                return next(ApiError.invalidData({message: 'Такой бренд уже существует'}))
            }
            const brand = await Brand.create({name})
            return res.json(brand)
        }
        catch (e) {
            return  next(ApiError.serverError())
        }
    }

    async delete(req, res, next) {
        try {
            const {brandId} = req.query
            const deletedBrand = await Brand.destroy({
                where: {id: brandId}
            })
            return res.json(deletedBrand)
        }
        catch (e) {
            return  next(ApiError.serverError())
        }
    }

    async get(req, res, next) {
        try {
            const brands = await Brand.findAll()
            return res.json(brands)
        }
        catch (e) {
            return  next(ApiError.serverError())
        }
    }
}

module.exports = new BrandController()