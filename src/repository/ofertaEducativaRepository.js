const pool = require('../config/postgres')

const queryCreate = `
    INSERT INTO ofertaeducativa (
        nombre, descripcion, duracion, perfil, id_escuela
    ) VALUES ($1,$2,$3,$4,$5) RETURNING *
`

const queryFindAllByIdEscuela = `
    SELECT * FROM ofertaeducativa WHERE id_escuela = $1
`

const queryExisteOfertaByIdOrganizacion =  `
    SELECT * FROM ofertaeducativa WHERE nombre = $1 and id_escuela = $2
`

const existeOfertaByIdOrganizacion = async (nombre, id_escuela) => {
    const result = await pool.query(queryExisteOfertaByIdOrganizacion, [nombre, id_escuela])
    return result.rowCount > 0
}

const create = async (nombre, descripcion, duracion, perfil, id_escuela) => {
    const result = await pool.query(queryCreate, [nombre, descripcion, duracion, perfil, id_escuela])
    const row = result.rows[0]
    return {
        id : row.id,
        nombre : row.nombre,
        descripcion : row.descripcion,
        perfil : row.perfil,
        id_escuela : row.id_escuela
    }
}

const findAllByIdEscuela = async (id_escuela) => {
    const result = await pool.query(queryFindAllByIdEscuela, [id_escuela])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id: row.id,
                nombre: row.nombre,
                descripcion : row.descripcion,
                duracion : row.duracion,
                perfil : row.perfil,
                id_escuela : row.id_escuela
            }
        }
    )
}

module.exports = {findAllByIdEscuela, create, existeOfertaByIdOrganizacion}