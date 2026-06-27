const contactoRepository = require('../repository/contactoRepository')

const create = async (correo, telefono) => {
    const contacto = await contactoRepository.create(correo, telefono);
    return contacto;
}

const findById = async (id) => {
    const contacto = await contactoRepository.findById(id);
    return contacto;
}

const updateById = async (id, correo, telefono) => {
    const contacto = await contactoRepository.updateById(id, correo, telefono);
    return contacto;
}

const deleteById = async (id) => {
    const result = await contactoRepository.deleteById(id)
    return result
}

module.exports = {
    create, findById, updateById, deleteById
}