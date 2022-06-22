const {UnauthorizedError} = require('../errors')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('No auth token provided')
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {username, id}
        next()
    } catch (error) {
        throw new UnauthorizedError('Not Authorized to access this route')
    }

}

module.exports = authMiddleware