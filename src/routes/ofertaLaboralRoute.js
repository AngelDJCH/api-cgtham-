const ofertaLaboralController = require('../controllers/ofertaLaboral')
const express = require('express')
const ofertaLaboralRoutes = express.Router()
const { validateCreate, validateDeleteById, validateFindById, validateUpdateById } = require('../validator/ofertaLaboralValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

ofertaLaboralRoutes.get('/count', ofertaLaboralController.countOfertas)
ofertaLaboralRoutes.get('/', ofertaLaboralController.findAll)
ofertaLaboralRoutes.get('/:id', validateFindById, ofertaLaboralController.findById)
ofertaLaboralRoutes.get('/organizacion/:id_organizacion', ofertaLaboralController.findAllByIdOrganizacion)
ofertaLaboralRoutes.post('/',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), validateCreate, ofertaLaboralController.create)
ofertaLaboralRoutes.put('/:id',auth, verifyRoles('ADMIN_ORG'), validateUpdateById, ofertaLaboralController.updateById)
ofertaLaboralRoutes.delete('/:id',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), validateDeleteById, ofertaLaboralController.deleteById)

module.exports = ofertaLaboralRoutes