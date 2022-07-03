const {Device, Type, Brand} = require("../models/models");

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
}

module.exports = DeviceService