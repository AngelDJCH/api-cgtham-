const cloudinaryConfigService = require('../services/cloudinaryConfigService')

const create = async (req, res,next) => {
    try {
        const {nombre, clave, clave_secreta, id_organizacion} = req.body
        const cloudinaryconfig = await cloudinaryConfigService.create(nombre, clave, clave_secreta, id_organizacion)
        res.status(201).json(cloudinaryconfig.toJSON())
    } catch (error) {
        next(error)
    }
}

const findByIdOrganizacion = async (req, res,next) => {
    try {
        const id_organizacion = req.params.id_organizacion
        const cloudinaryconfig = await cloudinaryConfigService.findByIdOrganizacion(id_organizacion)
        res.status(200).json(cloudinaryconfig.toJSON())
    } catch (error) {
        next(error)
    }
}

const updateByIdOrganizacion = async (req, res,next) => {
    try {
        const id_organizacion = req.params.id
        const {nombre, clave, clave_secreta} = req.body
        const cloudinaryconfig = await cloudinaryConfigService.updateByIdOrganizacion(nombre, clave, clave_secreta, id_organizacion)
        res.status(200).json(cloudinaryconfig.toJSON())
    } catch (error) {
        next(error)
    }
}

module.exports = {create, findByIdOrganizacion, updateByIdOrganizacion}