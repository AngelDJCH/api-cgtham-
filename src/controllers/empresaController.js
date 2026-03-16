const empresaService = require('../services/empresaService')

const create = async (req, res) => {
    try {
        const { id_organizacion, razon_social, regimen_fiscal, direccion_fiscal } = req.body;
        const empresa = await empresaService.create(id_organizacion, razon_social, regimen_fiscal, direccion_fiscal);
        res.status(201).json(empresa.toJSON())
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
        const id = req.params.id;
        const empresa = await empresaService.findById(id);
        res.status(200).json(empresa.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const findAll = async (req, res) => {
    try {
        const empresas = await empresaService.findAll()
        res.status(200).json(
            empresas.map(
                empresa => empresa.toJSON()
            )
        )
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const updateById = async (req, res) => {
    try {
        const {razon_social, regimen_fiscal, direccion_fiscal } = req.body;
        const id = req.params.id;
        const empresa = await empresaService.updateById(id, razon_social, regimen_fiscal, direccion_fiscal)
        res.status(200).json(empresa.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const empresa = await empresaService.deleteById(id)
        res.status(204).json({message:"Eliminacion exitosa"})
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

module.exports = { create, findById, findAll, updateById, deleteById }