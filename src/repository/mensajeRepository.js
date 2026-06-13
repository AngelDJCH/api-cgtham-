const pool = require('../config/postgres')
const Mensaje = require('../models/mensaje')

const queryCreate = `
    INSERT INTO mensajes (contenido, id_emisor, id_receptor, id_chat) 
    VALUES($1,$2,$3, $4) RETURNING *
`

const queryfindAllByIdChat = `
    SELECT * FROM mensajes AS m WHERE m.id_chat = $1
`

const create = async (contenido, id_emisor, id_receptor, id_chat) => {
    const result = await pool.query(queryCreate, [contenido, id_emisor, id_receptor, id_chat])
    if(result.rowCount === 0) throw new Error(`Ocurrio un error al intentar enviar un mensaje`)
    const row = result.rows[0]
    return new Mensaje(
        row.id,
        row.contenido,
        row.id_emisor,
        row.id_receptor
    )
}

const findAllByIdChat = async (id) => {
    const result = await pool.query(queryfindAllByIdChat, [id])
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

module.exports = {create, findAllByIdChat}