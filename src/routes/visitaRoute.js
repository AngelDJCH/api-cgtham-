const express = require('express')
const visitaRoute = express.Router()
const visitaController = require('../controllers/visitaController')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')
const {
    validateCreate,
    validateFindById,
    validateFindByIdEmpresa,
    validateFindByIdEscuela,
    validateUpdateEstadoRechazadaById,
    validateUpdateById,
    validateDeleteByIdForEscuelas
} = require('../validator/visitaValidator')

visitaRoute.get('/administrador', auth, verifyRoles('ADMIN_SYS'), visitaController.findAllForAdministrador)

visitaRoute.post('/', auth, validateCreate, visitaController.create)
// visitaRoute.get('/', visitaController.findAll)
visitaRoute.get('/:id', auth, validateFindById, visitaController.findById)
visitaRoute.get('/empresa/:id_empresa', auth, validateFindByIdEmpresa, visitaController.findByIdEmpresa)
visitaRoute.get('/escuela/:id_escuela', auth, validateFindByIdEscuela, visitaController.findByIdEscuela)
visitaRoute.put('/estado/:id', auth, validateUpdateEstadoRechazadaById, visitaController.updateEstadoRechazadaById)
visitaRoute.put('/:id', auth, validateUpdateById, visitaController.updateById)
visitaRoute.delete(`/:id`, auth, validateDeleteByIdForEscuelas, visitaController.deleteByIdForEscuelas)

module.exports = visitaRoute