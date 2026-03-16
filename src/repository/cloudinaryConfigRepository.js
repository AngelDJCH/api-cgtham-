const pool = require('../config/postgres')

const queryCreate = `
    INSERT INTO cloudinaryconfig (nombre, clave, clave_secreta, id_organizacion)
    VALUES($1,$2,$3,$4) RETURNING *
`

const queryFindByIdOrganizacion = `
    SELECT * FROM cloudinaryconfig AS cc WHERE cc.id_organizacion = $1
`

const queryUpdateIdOrganizacion = `
    UPDATE cloudinaryconfig AS cc SET nombre = $1, clave = $2, clave_secreta = $3
    WHERE cc.id_organizacion = $4 RETURNING *
`

const create = async (nombre, clave, clave_secreta, id_organizacion) => {
    const result = await pool.query(queryCreate, [nombre, clave, clave_secreta, id_organizacion])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al crear una nueva configuracion de cloud')
    const row = result.rows[0]
    return new CloudinaryConfig(
        row.id,
        row.nombre,
        row.clave,
        row.clave_secreta,
        row.id_organizacion
    )
}

const findByIdOrganizacion = async (id_organizacion) => {
    const result = await pool.query(queryFindByIdOrganizacion, [id_organizacion])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al obtener la configuracion de cloud')
    const row = result.rows[0]
    return new CloudinaryConfig(
        row.id,
        row.nombre,
        row.clave,
        row.clave_secreta,
        row.id_organizacion
    )
}

const updateByIdOrganizacion = async (nombre, clave, clave_secreta, id_organizacion) => {
    const result = await pool.query(queryUpdateIdOrganizacion, [nombre, clave, clave_secreta, id_organizacion])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al actualizar la configuracion de cloud')
    const row = result.rows[0]
    return new CloudinaryConfig(
        row.id,
        row.nombre,
        row.clave,
        row.clave_secreta,
        row.id_organizacion
    )
}

module.exports = {create, findByIdOrganizacion, updateByIdOrganizacion}