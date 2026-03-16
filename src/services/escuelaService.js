const escuelaRepository = require('../repository/escuelaRepository')

const create = async (id_organizacion, tipo_institucion, url_sitio) => {
    const escuela = await escuelaRepository.create(id_organizacion, tipo_institucion, url_sitio);
    return escuela;
}

const findById = async (id_organizacion) => {
    const escuela = await escuelaRepository.findById(id_organizacion)
    return escuela;
}

const findAll = async () => {
    const escuelas = await escuelaRepository.findAll()
    return escuelas;
}

const updateById = async (id_organizacion, tipo_institucion, url_sitio) => {
    if (!id_organizacion || !tipo_institucion || !url_sitio) throw new Error(`Datos invalidos \n id_organizacion: ${id_organizacion} \n Tipo de institucion: ${tipo_institucion} \n Url sitio: ${url_sitio}`)
    const escuela = await escuelaRepository.updateById(id_organizacion, tipo_institucion, url_sitio);
    return escuela;
}

const deleteById = async (id_organizacion) => {
    const escuela = await escuelaRepository.deleteById(id_organizacion)
    return escuela;
}

module.exports = {create, findById, findAll, updateById, deleteById}