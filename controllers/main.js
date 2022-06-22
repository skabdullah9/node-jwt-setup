const {BadRequestError} = require('../errors')
const jwt = require('jsonwebtoken')

const dashboard = (req, res) => {
    const luckyNum = Math.floor(Math.random() * 99)
    res.status(200).json({msg: `Hello ${req.user.username}, and your secret key is: ${luckyNum}`})
}

const login = (req, res) => {
    const {username, password} = req.body

    if(!username || !password) {
        throw new BadRequestError('Please provide username & password')
    }
    const id = new Date().getDate()
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'})

    res.status(200).json({msg: 'user logged In..', token})
}

module.exports = {dashboard, login}