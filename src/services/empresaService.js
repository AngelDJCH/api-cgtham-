const empresaRepository = require('../repository/empresaRepository')

const create = async (id_organizacion, razon_social, regimen_fiscal, direccion_fiscal) => {
    const empresa = await empresaRepository.create(id_organizacion, razon_social, regimen_fiscal, direccion_fiscal)
    return empresa;
}

const findById = async (id_organizacion) => {
    const empresa = await empresaRepository.findById(id_organizacion)
    return empresa;
}

const findAll = async (params) => {
    const empresas = await empresaRepository.findAll()
    return empresas;
}

const updateById = async (id_organizacion, razon_social, regimen_fiscal, direccion_fiscal) => {
    const empresa = await empresaRepository.updateById(id_organizacion, razon_social, regimen_fiscal, direccion_fiscal);
    return empresa;
}

const deleteById = async (id_organizacion) => {
    const empresa = await empresaRepository.deleteById(id_organizacion);
    return empresa;
}

module.exports = { create, findById, findAll, updateById, deleteById }