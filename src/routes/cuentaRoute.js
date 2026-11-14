const cuentaController = require('../controllers/cuentaController')
const express = require('express')
const rateLimit = require('express-rate-limit')
const cuentaRoutes = express.Router()
const {
    validateCreate,
    validateFindById,
    validateUpdateById,
    validateLogin,
    validateUpdateCorreo,
    validateContrasenia,
    validateSolicitarRecuperacion,
    validateVerificarCodigo,
    validateRestablecerRecuperacion
} = require('../validator/cuentaValidator')
const auth = require('../midlewares/auth')

// Rate limiters para robustez y mitigación de abusos (Módulo 4)
const limiterSolicitarRecuperacion = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: 'Has excedido el número de solicitudes permitidas. Espera 15 minutos antes de intentar de nuevo.' },
    standardHeaders: true,
    legacyHeaders: false
})

const limiterVerificarCodigo = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: 'Demasiados intentos de verificación de código. Por seguridad, espera 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false
})

cuentaRoutes.post('/', validateCreate, cuentaController.create)
cuentaRoutes.get('/verify', auth, cuentaController.verificarSesion)
cuentaRoutes.get('/:id', auth, validateFindById, cuentaController.findById)
// cuentaRoutes.put('/:id',auth, validateUpdateById, cuentaController.updateRolById)
cuentaRoutes.put('/correo/:id', validateUpdateCorreo, cuentaController.updateCorreoByIdOrganizacion)
cuentaRoutes.put('/contrasenia/:id', validateContrasenia, cuentaController.updateContraseniaByIdOrganizacion)

cuentaRoutes.post('/login', validateLogin, cuentaController.login)
cuentaRoutes.post('/logout', auth, cuentaController.logout)

cuentaRoutes.post('/recuperar-solicitud', limiterSolicitarRecuperacion, validateSolicitarRecuperacion, cuentaController.solicitarRecuperacion)
cuentaRoutes.post('/recuperar-validar-codigo', limiterVerificarCodigo, validateVerificarCodigo, cuentaController.validarCodigoRecuperacion)
cuentaRoutes.post('/recuperar-confirmar', limiterVerificarCodigo, validateRestablecerRecuperacion, cuentaController.confirmarRecuperacion)

module.exports = cuentaRoutes