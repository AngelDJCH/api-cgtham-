const fotoRepository = require('../repository/fotoRepository')

const create = async (url_imagen, id_evento) => {
    const foto = await fotoRepository.create(url_imagen, id_evento)
    return foto;
}

const findByIdEvento = async (id_evento) => {
    const fotos = await fotoRepository.findByIdEvento(id_evento)
    return fotos;
}

const deleteById = async (id) => {
    const foto = await fotoRepository.deleteById(id)
    return foto;
}

module.exports = {create, findByIdEvento, deleteById}