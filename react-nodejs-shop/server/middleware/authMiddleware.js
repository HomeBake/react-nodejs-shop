const jwt = require("jsonwebtoken")
const {verify} = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            return res.status(401).json({message: 'Пользователь не авторизован'})
        }
        const decode = verify(token, process.env.JWT_SECRET_KEY)
        req.user = decode
        next()
    } catch (e) {
        res.status(401).json({message: 'Пользователь не авторизован'})
    }
}