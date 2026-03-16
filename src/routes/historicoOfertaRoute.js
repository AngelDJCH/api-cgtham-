const historicoOfertaController = require('../controllers/historicoOfertaController')
const express = require('express')
const historicoOfertaRoutes = express.Router()
const { validateCreate, validateFindById, validateFindByIdOferta } = require('../validator/historicoOfertaValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

historicoOfertaRoutes.post('/',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), validateCreate, historicoOfertaController.create)
historicoOfertaRoutes.get('/:id',auth, verifyRoles('ADMIN_SYS'), validateFindById, historicoOfertaController.findById)
historicoOfertaRoutes.get('/ofertaslaborales/:id',auth, verifyRoles('ADMIN_SYS'), validateFindByIdOferta, historicoOfertaController.findByIdOferta)

module.exports = historicoOfertaRoutes;