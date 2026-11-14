const mensajeController = require('../controllers/mensajeController')
const express = require('express')
const mensajeRoutes = express.Router()
const { validateCreate, validateFindAllByIdEmisorAndIdReceptor } = require('../validator/mensajeValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

mensajeRoutes.post('/', validateCreate, mensajeController.create)
mensajeRoutes.post('/chat', validateFindAllByIdEmisorAndIdReceptor, mensajeController.findAllByIdChat)
mensajeRoutes.get('/pendientes/:id_organizacion', mensajeController.findUltimosMensajesPorOrganizacion)

module.exports = mensajeRoutes