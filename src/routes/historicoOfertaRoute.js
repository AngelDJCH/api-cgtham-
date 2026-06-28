const historicoOfertaController = require('../controllers/historicoOfertaController')
const express = require('express')
const historicoOfertaRoutes = express.Router()
const { validateCreate, validateFindById, validateFindByIdOferta } = require('../validator/historicoOfertaValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

historicoOfertaRoutes.get('/count', historicoOfertaController.countHistoricosOfertas)
historicoOfertaRoutes.get('/', auth, verifyRoles('ADMIN_SYS'), historicoOfertaController.findAll)
historicoOfertaRoutes.post('/',auth, validateCreate, historicoOfertaController.create)
historicoOfertaRoutes.get('/:id',auth, verifyRoles('ADMIN_SYS'), validateFindById, historicoOfertaController.findById)
historicoOfertaRoutes.get('/ofertaslaborales/:id',auth, verifyRoles('ADMIN_SYS'), validateFindByIdOferta, historicoOfertaController.findByIdOferta)

module.exports = historicoOfertaRoutes;