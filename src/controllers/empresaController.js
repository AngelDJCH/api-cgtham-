const empresaService = require('../services/empresaService')

const create = async (req, res,next) => {
    try {
        const { id_organizacion, razon_social, regimen_fiscal, direccion_fiscal } = req.body;
        const empresa = await empresaService.create(id_organizacion, razon_social, regimen_fiscal, direccion_fiscal);
        res.status(201).json(empresa.toJSON())
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const empresa = await empresaService.findById(id);
        res.status(200).json(empresa.toJSON())
    } catch (error) {
        next(error)
    }
}

const findAll = async (req, res,next) => {
    try {
        const empresas = await empresaService.findAll()
        res.status(200).json(
            empresas.map(
                empresa => empresa.toJSON()
            )
        )
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res,next) => {
    try {
        const {razon_social, regimen_fiscal, direccion_fiscal } = req.body;
        const id = req.params.id;
        const empresa = await empresaService.updateById(id, razon_social, regimen_fiscal, direccion_fiscal)
        res.status(200).json(empresa.toJSON())
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const empresa = await empresaService.deleteById(id)
        res.status(204).json({message:"Eliminacion exitosa"})
    } catch (error) {
        next(error)
    }
}

module.exports = { create, findById, findAll, updateById, deleteById }