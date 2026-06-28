const cursoController = require('../controllers/cursoController')
const express = require('express')
const cursoRoutes = express.Router()
const auth = require('../midlewares/auth')

cursoRoutes.post('/', auth, cursoController.create)
cursoRoutes.post('/solicitar/', auth, cursoController.solicitar)
cursoRoutes.get('/empresas/', auth, cursoController.findAllToEmpresas)
cursoRoutes.get('/escuelas/:id_organizacion', auth, cursoController.findAllToEscuelas)
cursoRoutes.get('/:id_curso', auth, cursoController.findById)
cursoRoutes.get('/solicitudes/:id_organizacion', auth, cursoController.solicitudes)
cursoRoutes.put('/:id_curso', auth, cursoController.updateById)
cursoRoutes.put('/estado/:id_curso', auth, cursoController.updateEstadoById)
cursoRoutes.put('/solicitud/:id_curso', auth, cursoController.updateByIdForPeticion)
cursoRoutes.delete('/:id_curso', auth, cursoController.updateEstadoById)

module.exports = cursoRoutes