const pool = require('../config/postgres')

const queryCreate = `
    INSERT INTO chat (
        estado, organizacion1, organizacion2
    ) VALUES (
        true, $1,$2
    ) RETURNING *
`

const queryFindOrganizacion = `
    select id from chat where 
    (organizacion1 = $1 and organizacion2 = $2) or 
    (organizacion1 = $2 and organizacion2 = $1)
`

const create = async (organizacion1, organizacion2) => {
    const result = await pool.query(queryCreate, [organizacion1, organizacion2])
    const row = result.rows[0]
    return {
        id: row.id,
        estado: row.estado,
        organizacion1: row.organizacion1,
        organizacion2: row.organizacion2
    }
}

const findOrganizacionChat = async (id_emisor, id_receptor) => {
    const result = await pool.query(queryFindOrganizacion, [id_emisor, id_receptor])
    const row = result.rows[0]
    return {
        id : row.id
    }
}

module.exports = { create, findOrganizacionChat }