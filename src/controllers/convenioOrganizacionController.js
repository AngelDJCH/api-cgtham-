const convenioorganizacionService = require('../services/convenioOrganizacionService')

const create = async (req, res) => {
    try {
        const { rol, id_convenio, id_organizacion } = req.body
        const convenioOrganizacion = await convenioorganizacionService.create(rol, id_convenio, id_organizacion)
        res.status(201).json(convenioOrganizacion.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findById = async (req, res) => {
    try {
        const id = req.params.id
        const convenioOrganizacion = await convenioorganizacionService.findById(id)
        res.status(200).json(convenioOrganizacion.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const updateRolById = async (req, res) => {
    try {
        const id = req.params.id
        const { rol } = req.body
        const convenioOrganizacion = await convenioorganizacionService.updateRolById(id, rol)
        res.status(200).json(convenioOrganizacion.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

module.exports = { create, findById, updateRolById}