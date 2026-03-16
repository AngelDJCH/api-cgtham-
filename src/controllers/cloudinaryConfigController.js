const cloudinaryConfigService = require('../services/cloudinaryConfigService')

const create = async (req, res) => {
    try {
        const {nombre, clave, clave_secreta, id_organizacion} = req.body
        const cloudinaryconfig = await cloudinaryConfigService.create(nombre, clave, clave_secreta, id_organizacion)
        res.status(201).json(cloudinaryconfig.toJSON())
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const findByIdOrganizacion = async (req, res) => {
    try {
        const id_organizacion = req.params.id
        const cloudinaryconfig = await cloudinaryConfigService.findByIdOrganizacion(id_organizacion)
        res.status(200).json(cloudinaryconfig.toJSON())
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const updateByIdOrganizacion = async (req, res) => {
    try {
        const id_organizacion = req.params.id
        const {nombre, clave, clave_secreta} = req.body
        const cloudinaryconfig = await cloudinaryConfigService.updateByIdOrganizacion(nombre, clave, clave_secreta, id_organizacion)
        res.status(200).json(cloudinaryconfig.toJSON())
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = {create, findByIdOrganizacion, updateByIdOrganizacion}