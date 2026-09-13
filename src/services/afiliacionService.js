const afiliacionRepository =  require('../repository/afiliacionRepository')

const create = async(id_empresa, id_camara) =>{
    const result = await afiliacionRepository.create(id_empresa, id_camara)
    return result
}

const findByIdEmpresa = async (id_empresa) => {
    const result = await afiliacionRepository.findByIdEmpresa(id_empresa)
    return result    
}

module.exports = {create,findByIdEmpresa}