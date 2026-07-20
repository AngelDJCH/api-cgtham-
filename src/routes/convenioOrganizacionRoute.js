const convenioOrganizacionController = require('../controllers/convenioOrganizacionController')
const express = require('express')
const convenioOrganizacionRoutes = express.Router()
const { validateCreate, validateFindById, validateUpdateById,validateDeleteById } = require('../validator/convenioOrganizacionValidator')
const auth = require('../midlewares/auth')

convenioOrganizacionRoutes.get('/participantes/:id_convenio', auth, convenioOrganizacionController.findAllParticipantesById)
convenioOrganizacionRoutes.get('', auth, convenioOrganizacionController.findAll)
convenioOrganizacionRoutes.get('/:id',auth, validateFindById, convenioOrganizacionController.findById)
convenioOrganizacionRoutes.post('/',auth, validateCreate, convenioOrganizacionController.create)
convenioOrganizacionRoutes.put('/estado/:id', auth, convenioOrganizacionController.updateEstadoById)
convenioOrganizacionRoutes.put('/rol/:id',auth, validateUpdateById, convenioOrganizacionController.updateRolById)
convenioOrganizacionRoutes.delete('/:id', auth, validateDeleteById, convenioOrganizacionController.deleteById)
module.exports = convenioOrganizacionRoutes