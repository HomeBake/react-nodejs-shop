const jwt = require("jsonwebtoken")
const {verify} = require("jsonwebtoken");

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const userRole = req.user.role
            if(userRole !== role) {
                return res.status(403).json({message: 'Недостаточно прав'})
            }
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }
}