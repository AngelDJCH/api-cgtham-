const historicoEventoController = require('../controllers/historicoEventoController')
const express = require('express')
const historicoEventoRoutes = express.Router()
const { validateCreate, validateFindById, validateFindByIdEvento } = require('../validator/historicoEventoValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

historicoEventoRoutes.get('/', auth, historicoEventoController.findAll)
historicoEventoRoutes.get('/count', historicoEventoController.countHistoricosEventos)
historicoEventoRoutes.post('/',auth, validateCreate, historicoEventoController.create)
historicoEventoRoutes.get('/:id',auth, verifyRoles( 'ADMIN_SYS'), validateFindById, historicoEventoController.findById)
historicoEventoRoutes.get('/eventos/:id',auth, verifyRoles( 'ADMIN_SYS'), validateFindByIdEvento, historicoEventoController.findByIdEvento)

module.exports = historicoEventoRoutes