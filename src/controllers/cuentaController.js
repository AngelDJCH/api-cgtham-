const cuentaService = require('../services/cuentaService')
const bcrypt = require('bcrypt')

const { generateToken, verifyToken } = require('../helpers/jwtToken');
const { enviarCorreo } = require('../config/email');

const create = async (req, res,next) => {
    try {
        const { correo, contrasenia, id_organizacion } = req.body;
        const contraseniaHash = await bcrypt.hashSync(contrasenia, 10)
        const cuenta = await cuentaService.create(correo, contraseniaHash, ['ADMIN_ORG'], id_organizacion);
        // await enviarCorreo(
        //     correo, 'CREACIÓN DE CUENTA', 'Su cuenta ha sido creada',
        //     `
        //         <h1>Espera que un administrador valide tu cuenta!!</h1>
        //     `
        // )
        res.status(201).json(cuenta.toJSON())
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res,next) => {
    try {
        res.clearCookie('tk')
        res.status(204).json({ message: 'cookie borrada' })
    } catch (error) {
        next(error)
    }
}

const verificarSesion = async (req, res,next) => {
    try {
        const token = req.cookies.tk
        const decoded = verifyToken(token)
        const usuario = {
            id: decoded.data.id,
            correo: decoded.data.correo,
            rol: decoded.data.rol,
            tipo: decoded.data.tipo,
            organizacion: decoded.data.organizacion,
            foto: decoded.data.logo
        }
        res.status(200).json(
            usuario
        )
    } catch (error) {
        res.clearCookie('tk')
        next(error)
    }
}

const login = async (req, res,next) => {
    try {
        const { correo, contrasenia } = req.body;
        const cuenta = await cuentaService.login(correo)
        const result = bcrypt.compareSync(contrasenia, cuenta.contraseña)
        delete cuenta.contraseña
        const tk = await generateToken(cuenta)
        console.log(tk)
        if (result) {
            res.cookie('tk', tk,
                {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none' //'lax'
                }
            )
            res.status(200).json(cuenta)
        }
        if (!result) throw new Error('Contrasenia incorrecta')
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const cuenta = await cuentaService.findById(id)
        res.status(200).json(cuenta.toJSON())
    } catch (error) {
        next(error)
    }
}

const updateRolById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const { roles } = req.body;
        const cuenta = await cuentaService.updateById(id, roles)
        res.status(200).json(cuenta.toJSON())
    } catch (error) {
        next(error)
    }
}

const updateCorreoByIdOrganizacion = async (req, res,next) => {
    try {
        const id = req.params.id
        const { correo } = req.body
        const cuenta = await cuentaService.updateCorreoByIdOrganizacion(correo, id)
        res.status(200).json(cuenta.toJSON())
    } catch (error) {
        next(error)
    }
}

const updateContraseniaByIdOrganizacion = async (req, res,next) => {
    try {
        const id = req.params.id
        const { contrasenia } = req.body
        const contraseniaHash = await bcrypt.hashSync(contrasenia, 10)
        const cuenta = await cuentaService.updateContraseniaByIdOrganizacion(contraseniaHash, id)
        res.status(200).json(cuenta.toJSON())
    } catch (error) {
        next(error)
    }
}

module.exports = { create, findById, updateRolById, login, logout, verificarSesion, updateCorreoByIdOrganizacion, updateContraseniaByIdOrganizacion }