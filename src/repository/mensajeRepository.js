const pool = require('../config/postgres')
const Mensaje = require('../models/mensaje')

const queryCreate = `
    INSERT INTO mensajes (contenido, id_emisor, id_receptor) 
    VALUES($1,$2,$3) RETURNING *
`

const queryfindAllByIdEmisorAndIdReceptor = `
    SELECT * FROM mensajes AS m WHERE (m.id_emisor = $1 AND m.id_receptor = $2) OR (m.id_emisor = $2 AND m.id_receptor = $1)
`

const create = async (contenido, id_emisor, id_receptor) => {
    const result = await pool.query(queryCreate, [contenido, id_emisor, id_receptor])
    if(result.rowCount === 0) throw new Error(`Ocurrio un error al intentar enviar un mensaje`)
    const row = result.rows[0]
    return new Mensaje(
        row.id,
        row.contenido,
        row.id_emisor,
        row.id_receptor
    )
}

const findAllByIdEmisorAndIdReceptor = async (id_emisor, id_receptor) => {
    const result = await pool.query(queryfindAllByIdEmisorAndIdReceptor, [id_emisor, id_receptor])
    if(result.rowCount === 0) throw new Error(`Ocurrio un error al obtener los mensajes de este chat`)
    const rows =  result.rows
    return rows.map(
        row => new Mensaje(
            row.id,
            row.contenido,
            row.id_emisor,
            row.id_receptor
        )
    )
}

module.exports = {create, findAllByIdEmisorAndIdReceptor}