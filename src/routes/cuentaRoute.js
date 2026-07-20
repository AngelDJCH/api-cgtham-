const cuentaController = require('../controllers/cuentaController')
const express = require('express')
const cuentaRoutes = express.Router()
const { validateCreate, validateFindById, validateUpdateById, validateLogin, validateUpdateCorreo, validateContrasenia } = require('../validator/cuentaValidator')
const auth = require('../midlewares/auth')

cuentaRoutes.post('/', validateCreate, cuentaController.create)
cuentaRoutes.get('/verify', auth, cuentaController.verificarSesion)
cuentaRoutes.get('/:id', auth, validateFindById, cuentaController.findById)
// cuentaRoutes.put('/:id',auth, validateUpdateById, cuentaController.updateRolById)
cuentaRoutes.put('/correo/:id', validateUpdateCorreo, cuentaController.updateCorreoByIdOrganizacion)
cuentaRoutes.put('/contrasenia/:id', validateContrasenia, cuentaController.updateContraseniaByIdOrganizacion)

cuentaRoutes.post('/login', validateLogin, cuentaController.login)
cuentaRoutes.post('/logout', auth, cuentaController.logout)

module.exports = cuentaRoutes