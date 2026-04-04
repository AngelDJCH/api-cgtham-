const comentarioController = require('../controllers/comentarioController')
const express = require('express')
const comentarioRoutes = express.Router()
const { validateCreate, validateDeleteById, validateFindAllByIdUsuario, validateFindById, validateUpdateContenidoById, validateUpdateEstadoById } = require('../validator/comentarioValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

comentarioRoutes.get('/public', comentarioController.findAllComentarios)
comentarioRoutes.get('/:estado/:limite', comentarioController.findAll)
comentarioRoutes.post('/', auth, verifyRoles('USER'), validateCreate, comentarioController.create)
comentarioRoutes.get('/:id', auth, verifyRoles('USER'), validateFindById, comentarioController.findById)
comentarioRoutes.get('/usuarios/:id', auth, verifyRoles('USER'), validateFindAllByIdUsuario, comentarioController.findAllByIdUsuario)
comentarioRoutes.get('/', auth, verifyRoles('ADMIN_SYS'), comentarioController.findAllComentariosByAdministrador)
comentarioRoutes.put('/estado/:id', auth, verifyRoles('USER'), validateUpdateEstadoById, comentarioController.updateEstadoById)
comentarioRoutes.put('/contenido/:id', auth, verifyRoles('USER'), validateUpdateContenidoById, comentarioController.updateContenidoById)
comentarioRoutes.delete('/:id', auth, verifyRoles('USER'), validateDeleteById, comentarioController.deleteById)

module.exports = comentarioRoutes