const organizacionService = require('../services/organizacionService')

const create = async (req, res,next) => {
    try {
        const { nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id_contacto, id_direccion } = req.body;
        const organizacion = await organizacionService.create(nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id_contacto, id_direccion);
        res.status(201).json(organizacion.toJSON())
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const organizacion = await organizacionService.findById(id)
        res.status(200).json(organizacion.toJSON())
    } catch (error) {
        next(error)
    }
}

const findAll = async (req, res,next) => {
    try {
        const organizaciones = await organizacionService.findAll();
        res.status(200).json(
            organizaciones.map(
                organizacion => organizacion.toJSON()
            )
        )
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const { nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc} = req.body;
        const organizacion = await organizacionService.updateById(id, nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc)
        res.status(200).json(organizacion.toJSON())
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const organizacion = await organizacionService.deleteById(id)
        res.status(204).json({
            message: 'Elimninado exitosamente'
        })
    } catch (error) {
        next(error)
    }
}

const countOrganizaciones = async (req, res,next) => {
    try {
        const count_organizaciones = await organizacionService.countOrganizaciones()
        res.status(200).json({
            organizaciones: count_organizaciones
        })
    } catch (error) {
        next(error)
    }
}

const findAllNoAprobadas = async (req, res,next) => {
    try {
        const organizaciones = await organizacionService.findAllNoAprobadas()
        res.status(200).json(organizaciones)        
    } catch (error) {
        next(error)
    }
}

const findByIdFast = async (req, res,next) => {
    try {
        const id_organizacion = req.params.id_organizacion
        const organizacion = await organizacionService.findByIdFast(id_organizacion)
        res.status(200).json(organizacion)
    } catch (error) {
        next(error)
    }
}

const updateEstadoById = async (req, res,next) => {
    try {
        const id = req.params.id
        const {estado} = req.body
        const organizacion = await organizacionService.updateEstadoById(id, estado)
        res.status(200).json(organizacion)
    } catch (error) {
        next(error)
    }
}

const findLogoByIdOrganizacion = async (req, res,next) => {
    try {
        const id = req.params.id
        const logo = await organizacionService.findLogoByIdOrganizacion(id)
        res.status(200).json(logo)
    } catch (error) {
        next(error)
    }
}

module.exports = {findLogoByIdOrganizacion,updateEstadoById, create, findById, findAll, updateById, deleteById, countOrganizaciones, findAllNoAprobadas,findByIdFast}