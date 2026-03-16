const camaraRepository = require('../repository/camaraRepository')

const create = async (id_organizacion, nombre, presidente) => {
    const camara = await camaraRepository.create(id_organizacion, nombre, presidente);
    return camara;
}

const findById = async (id_organizacion) => {
    const camara = await camaraRepository.findById(id_organizacion);
    return camara;
}

const findAll = async () => {
    const camaras = await camaraRepository.findAll();
    return camaras;
}

const updateById = async (id_organizacion, nombre, presidente) => {
    const camara = await camaraRepository.updateById(id_organizacion, nombre, presidente);
    return camara;
}

const deleteById = async (id_organizacion) => {
    const camara = await camaraRepository.deleteById(id_organizacion);
    return camara;
}

module.exports = { create, findById, findAll, updateById, deleteById }