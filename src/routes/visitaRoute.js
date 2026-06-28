const express = require('express')
const visitaRoute = express.Router()
const visitaController = require('../controllers/visitaController')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')
visitaRoute.get('/administrador', auth, verifyRoles('ADMIN_SYS'), visitaController.findAllForAdministrador)

visitaRoute.post('/', auth, visitaController.create)
// visitaRoute.get('/', visitaController.findAll)
visitaRoute.get('/:id', auth, visitaController.findById)
visitaRoute.get('/empresa/:id_empresa', auth, visitaController.findByIdEmpresa)
visitaRoute.get('/escuela/:id_escuela', auth, visitaController.findByIdEscuela)
visitaRoute.put('/estado/:id', auth, visitaController.updateEstadoRechazadaById)
visitaRoute.put('/:id', auth, visitaController.updateById)
visitaRoute.delete(`/:id`, auth, visitaController.deleteByIdForEscuelas)

module.exports = visitaRoute