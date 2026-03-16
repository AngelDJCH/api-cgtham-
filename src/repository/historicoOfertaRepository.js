const pool = require('../config/postgres')
const HistoricoOferta = require('../models/historicoOferta')

const queryCreate = `
    INSERT INTO historicosoferta (fecha, accion, id_oferta, id_usuario)
    VALUES($1,$2,$3,$4) RETURNING *
`
const queryFindByIdOferta = `
    SELECT * FROM historicosoferta AS hf WHERE hf.id_oferta = $1
`
const queryFindById = `
    SELECT * FROM historicosoferta AS hf WHERE hf.id = $1
`

const create = async (fecha, accion, id_oferta, id_usuario) => {
    const result = await pool.query(queryCreate, [fecha, accion, id_oferta, id_usuario])
    if (result.rowCount === 0) throw new Error('Ocurrio un error')
    const row = result.rows[0]
    return new HistoricoOferta(
        row.id,
        row.fecha,
        row.accion,
        row.id_oferta,
        row.id_usuario
    )
}

const findByIdOferta = async (id_oferta) => {
    const result = await pool.query(queryFindByIdOferta, [id_oferta])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al obtener los datos')
    const rows = result.rows
    return rows.map(
        row => new HistoricoOferta(
            row.id,
            row.fecha,
            row.accion,
            row.id_oferta,
            row.id_usuario
        )
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id])
    if (result.rowCount === 0) throw new Error('Ocurrio un erro al obtener de la base de datos')
    const row = result.rows[0]
    return new HistoricoOferta(
        row.id,
        row.fecha,
        row.accion,
        row.id_oferta,
        row.id_usuario
    )
}

module.exports = {create, findById, findByIdOferta}