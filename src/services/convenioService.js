const convenioRepository = require('../repository/convenioRepository')

const create = async (titulo, descripcion, tipo, estado, fecha_registro, fecha_inicio, fecha_final) => {
    const convenio = await convenioRepository.create(titulo, descripcion, tipo, estado, fecha_registro, fecha_inicio, fecha_final);
    return convenio;
}

const findById = async (id) => {
    const convenio = await convenioRepository.findById(id)
    return convenio;
}

const findAll = async () => {
    const convenios = await convenioRepository.findAll()
    return convenios;
}

const updateById = async (id, titulo, descripcion, tipo, fecha_inicio, fecha_final) => {
    const convenio = await convenioRepository.updateById(id, titulo, descripcion, tipo, fecha_inicio, fecha_final)
    return convenio;
}

const deleteById = async (id) => {
    const convenio = await convenioRepository.deleteById(id)
    return convenio;
}

const countConvenios = async () => {
    const count_convenios = await convenioRepository.countConvenios()
    return count_convenios
}

module.exports = {create, findAll, findById, updateById, deleteById, countConvenios}