const mensajeController = require('../controllers/mensajeController')
const express = require('express')
const mensajeRoutes = express.Router()
const {validateCreate, validateFindAllByIdEmisorAndIdReceptor} = require('../validator/mensajeValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

mensajeRoutes.post('/', auth, verifyRoles('USER'),validateCreate,mensajeController.create)
mensajeRoutes.post('/chat',auth, verifyRoles('USER'), validateFindAllByIdEmisorAndIdReceptor,mensajeController.findAllByIdEmisorAndIdReceptor)

module.exports = mensajeRoutes