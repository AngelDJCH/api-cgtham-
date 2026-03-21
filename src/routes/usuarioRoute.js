const usuarioController = require('../controllers/usuarioController')
const express = require('express')
const usuarioRoutes = express.Router()
const { validateCreate, validateFindById, validateUpdateById, validateDeleteById } = require('../validator/usuarioValidator')
const auth = require('../midlewares/auth')
const verifyRoles = require('../midlewares/verifyRoles')

usuarioRoutes.get('/count', usuarioController.countUsuarios)
usuarioRoutes.get('/', auth, verifyRoles('ADMIN_ORG', 'ADMIN_SYS'), usuarioController.findAll);
usuarioRoutes.get('/:id', auth, validateFindById, usuarioController.findById);
usuarioRoutes.post('/', validateCreate, usuarioController.create);
usuarioRoutes.put('/:id', auth, validateUpdateById, usuarioController.updateById);
usuarioRoutes.delete('/:id', auth, validateDeleteById, usuarioController.deleteById)

module.exports = usuarioRoutes 