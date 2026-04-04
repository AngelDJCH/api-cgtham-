const inscripcionController = require('../controllers/inscripcionController')
const express = require('express')
const inscripcionRoutes = express.Router()
const {validateCreate, validateDeleteById, validateFindByIdAndEstado, validateUpdateEstadoById} = require('../validator/inscripcionValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

inscripcionRoutes.get('/estado/:id',auth, verifyRoles('USER'), validateFindByIdAndEstado,inscripcionController.findByIdAndEstado)
inscripcionRoutes.get('/organizaciones/:id_organizacion', auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), inscripcionController.findAllByIdOrganizacion)
inscripcionRoutes.post('/',auth, verifyRoles('USER'), validateCreate,inscripcionController.create)
inscripcionRoutes.put('/estado/:id',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), validateUpdateEstadoById,inscripcionController.updateEstadoById)
inscripcionRoutes.delete('/:id',auth,verifyRoles('USER'), validateDeleteById,inscripcionController.deleteById)
// inscripcionRoutes.get('/')

module.exports = inscripcionRoutes