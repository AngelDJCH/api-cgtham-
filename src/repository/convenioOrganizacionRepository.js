const pool = require('../config/postgres')
const ConvenioOrganizacion = require('../models/convenioOrganizacion')

const queryCreate = `
    INSERT INTO convenioorganizacion (rol, id_convenio, id_organizacion) 
    VALUES($1,$2,$3) RETURNING *
`

const queryFindById = `
    SELECT * FROM convenioorganizacion AS co WHERE co.id = $1
`

const queryUpdateRolFindById = `
    UPDATE convenioorganizacion AS co SET rol WHERE co.id = $1
`

const create = async (rol, id_convenio, id_organizacion) => {
    const result = await pool.query(queryCreate, [rol, id_convenio, id_organizacion])
    if(result.rowCount === 0) throw new Error('Ocurrio un error al crear un convenio con la organizacion')
    const row = result.rows[0]
    return new ConvenioOrganizacion(
        row.id,
        row.rol,
        row.id_convenio,
        row.id_organizacion
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id])
    if(result.rowCount === 0)throw new Error(`Ocurrio un error al buscar el elemento con el ID ${id}`)
    const row = result.rows[0]
    return new ConvenioOrganizacion(
        row.id,
        row.rol,
        row.id_convenio,
        row.id_organizacion
    )
}

const updateRolById = async (id, rol) => {
    const result = await pool.query(queryUpdateRolFindById, [rol, id])
    if(result.rowCount === 0) throw new Error(`Ocurrio un error al actualizar el rol del convenio empresa con ID ${id}`)
    const row = result.rows[0]
    return new ConvenioOrganizacion(
        row.id,
        row.rol,
        row.id_convenio,
        row.id_organizacion
    )
}


module.exports = {create, findById, updateRolById}