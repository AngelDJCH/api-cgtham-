const express = require('express')
const visitaRoute = express.Router()
const visitaController = require('../controllers/visitaController')

visitaRoute.post('/', visitaController.create)
// visitaRoute.get('/', visitaController.findAll)
visitaRoute.get('/:id', visitaController.findById)
visitaRoute.get('/empresa/:id_empresa', visitaController.findByIdEmpresa)
visitaRoute.get('/escuela/:id_escuela', visitaController.findByIdEscuela)
visitaRoute.put('/estado/:id', visitaController.updateEstadoRechazadaById)
visitaRoute.put('/:id', visitaController.updateById)
visitaRoute.delete(`/:id`, visitaController.deleteByIdForEscuelas)

module.exports = visitaRoute