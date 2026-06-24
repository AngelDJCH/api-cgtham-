const empresaCamaraService = require('../services/empresaCamaraService')

const create = async (req, res,next) => {
    try {
        const {estado, fecha_afiliacion, fecha_vencimiento, id_empresa, id_camara} =  req.body;
        const empresaCamara = await empresaCamaraService.create(estado, fecha_afiliacion, fecha_vencimiento, id_empresa, id_camara)
        res.status(201).json(empresaCamara.toJSON())
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res,next) => {
    try {
        const id = req.params.id
        const empresaCamara = await empresaCamaraService.findById(id)
        res.status(200).json(empresaCamara.toJSON())
    } catch (error) {
        next(error)
    }
}

const findAll = async (req, res,next) => {
    try {
        const empresasCamaras = await empresaCamaraService.findAll()
        res.status(200).json(
            empresasCamaras.map(
                empresaCamara => empresaCamara.toJSON()
            )
        )
    } catch (error) {
        next(error)
    }
}

const updateEstadoById = async (req, res,next) => {
    try {
        const id = req.params.id
        const {estado} = req.body
        const empresaCamara = await empresaCamaraService.updateEstadoById(id,estado)
        res.status(200).json(empresaCamara.toJSON())
    } catch (error) {
        next(error)
    }
}

const updateFechaVencimientoById = async (req, res,next) => {
    try {
        const id = req.params.id
        const {fecha_vencimiento} = req.body
        const empresaCamara = await empresaCamaraService.updateFechaVencimientoById(id, fecha_vencimiento)
        res.status(200).json(empresaCamara.toJSON())
    } catch (error) {
        next(error)
    }
}

module.exports = {create, findAll, findById, updateEstadoById, updateFechaVencimientoById}