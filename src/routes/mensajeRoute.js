const mensajeController = require('../controllers/mensajeController')
const express = require('express')
const mensajeRoutes = express.Router()
const { validateCreate, validateFindAllByIdEmisorAndIdReceptor } = require('../validator/mensajeValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

mensajeRoutes.post('/', auth, validateCreate, mensajeController.create)
mensajeRoutes.post('/chat', auth, validateFindAllByIdEmisorAndIdReceptor, mensajeController.findAllByIdChat)

module.exports = mensajeRoutes