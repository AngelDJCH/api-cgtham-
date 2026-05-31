const cursoController = require('../controllers/cursoController')
const express = require('express')
const cursoRoutes = express.Router()
const auth = require('../midlewares/auth')

cursoRoutes.post('/', auth, cursoController.create)
cursoRoutes.post('/solicitar/', cursoController.solicitar)
cursoRoutes.get('/empresas/', auth, cursoController.findAllToEmpresas)
cursoRoutes.get('/escuelas/:id_organizacion', cursoController.findAllToEscuelas)
cursoRoutes.get('/:id_curso', cursoController.findById)
cursoRoutes.get('/solicitudes/:id_organizacion', cursoController.solicitudes)
cursoRoutes.put('/:id_curso', cursoController.updateById)
cursoRoutes.put('/estado/:id_curso', cursoController.updateEstadoById)
cursoRoutes.put('/solicitud/:id_curso', cursoController.updateByIdForPeticion)
cursoRoutes.delete('/:id_curso', cursoController.updateEstadoById)

module.exports = cursoRoutes