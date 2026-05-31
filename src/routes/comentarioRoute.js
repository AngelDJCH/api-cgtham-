const comentarioController = require('../controllers/comentarioController')
const express = require('express')
const comentarioRoutes = express.Router()
const { validateCreate, validateDeleteById, validateFindAllByIdUsuario, validateFindById, validateUpdateContenidoById, validateUpdateEstadoById } = require('../validator/comentarioValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

comentarioRoutes.get('/public', comentarioController.findAllComentarios)
// comentarioRoutes.get('/count')
comentarioRoutes.get('/organizacion/:id_organizacion', auth, validateFindAllByIdUsuario, comentarioController.findAllByIdUsuario)
comentarioRoutes.get('/:id', auth, validateFindById, comentarioController.findById)
comentarioRoutes.put('/contenido/:id', auth, validateUpdateContenidoById, comentarioController.updateContenidoById)
//comentarioRoutes.get('/:estado/:limite', comentarioController.findAll)
comentarioRoutes.post('/', auth, validateCreate, comentarioController.create)
comentarioRoutes.get('/', auth, verifyRoles('ADMIN_SYS'), comentarioController.findAllComentariosByAdministrador)
comentarioRoutes.put('/estado/:id', auth, validateUpdateEstadoById, comentarioController.updateEstadoById)
comentarioRoutes.delete('/:id', auth, validateDeleteById, comentarioController.deleteById)

module.exports = comentarioRoutes