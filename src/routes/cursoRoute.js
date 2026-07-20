const cursoController = require('../controllers/cursoController')
const express = require('express')
const cursoRoutes = express.Router()
const auth = require('../midlewares/auth')

const { validateCreate, validateSolicitar, validateFindAllEscuelas, validateFindById, validateSolicitudes, validateUpdateById, validateUpdateEstadoById, validateUpdateByIdForPeticion } = require('../validator/cursoValidator')

cursoRoutes.post('/', auth, validateCreate, cursoController.create)
cursoRoutes.post('/solicitar/', auth, validateSolicitar, cursoController.solicitar)
cursoRoutes.get('/empresas/', auth, cursoController.findAllToEmpresas)
cursoRoutes.get('/escuelas/:id_organizacion', auth, validateFindAllEscuelas, cursoController.findAllToEscuelas)
cursoRoutes.get('/:id_curso', auth, validateFindById, cursoController.findById)
cursoRoutes.get('/solicitudes/:id_organizacion', auth, validateSolicitudes,cursoController.solicitudes)
cursoRoutes.put('/:id_curso', auth, validateUpdateById, cursoController.updateById)
cursoRoutes.put('/estado/:id_curso', auth, validateUpdateEstadoById,cursoController.updateEstadoById)
cursoRoutes.put('/solicitud/:id_curso', auth, validateUpdateByIdForPeticion, cursoController.updateByIdForPeticion)
cursoRoutes.delete('/:id_curso', auth,validateUpdateEstadoById, cursoController.updateEstadoById)

module.exports = cursoRoutes