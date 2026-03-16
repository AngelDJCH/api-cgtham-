const convenioOrganizacionController = require('../controllers/convenioOrganizacionController')
const express = require('express')
const convenioOrganizacionRoutes = express.Router()
const { validateCreate, validateFindById, validateUpdateById } = require('../validator/convenioOrganizacionValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

convenioOrganizacionRoutes.get('/:id',auth, validateFindById, convenioOrganizacionController.findById)
convenioOrganizacionRoutes.post('/',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), validateCreate, convenioOrganizacionController.create)
convenioOrganizacionRoutes.put('/rol/:id',auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), validateUpdateById, convenioOrganizacionController.updateRolById)

module.exports = convenioOrganizacionRoutes