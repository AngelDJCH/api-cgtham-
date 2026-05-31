const pool = require('../config/postgres')
const HistoricoEvento = require('../models/historicoEvento')

const queryCreate = `
    INSERT INTO historicosevento(fecha, accion, id_evento, id_cuenta)
    VALUES(now(),$1,$2,$3) RETURNING *
`
const queryFindByIdEvento = `
    SELECT * FROM historicosevento AS he WHERE he.id_evento = $1
`
const queryFindById = `
    SELECT * FROM historicosevento AS he WHERE he.id = $1
`

const queryCountHistoricosEventos = `
    SELECT COUNT(*) AS total FROM historicosevento
`

const queryFindAllHistoricos = `
select 
o.nombre_comercial, e.titulo, h.accion, h.fecha
from historicosevento
as h inner join eventos as e on h.id_evento = e.id
inner join cuentas as c on c.id = h.id_cuenta
inner join organizaciones as o on o.id = c.id_organizacion
`

const create = async (accion, id_evento, id_cuenta) => {
    const result = await pool.query(queryCreate, [accion, id_evento, id_cuenta])
    if (result.rowCount === 0) throw new Error('Ocurrio un erro al insertar datos')
    const row = result.rows[0]
    return new HistoricoEvento(
        row.id,
        row.fecha,
        row.accion,
        row.id_evento,
        row.id_cuenta
    )
}

const findByIdEvento = async (id_evento) => {
    const result = await pool.query(queryFindByIdEvento, [id_evento])
    if (result.rowCount === 0) throw new Error('Ocurrio un erro al obtener los datos')
    const rows = result.rows
    return rows.map(
        row => new HistoricoEvento(
            row.id,
            row.fecha,
            row.accion,
            row.id_evento,
            row.id_usuario
        )
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al obtener los datos')
    const row = result.rows[0]
    return new HistoricoEvento(
        row.id,
        row.fecha,
        row.accion,
        row.id_evento,
        row.id_usuario
    )
}

const countHistoricosEventos = async () => {
    const result = await pool.query(queryCountHistoricosEventos)
    const row = result.rows[0].total
    return {
        historicos: row
    }
}

const findAllHistoricos = async () => {
    const result =  await pool.query(queryFindAllHistoricos)
    const rows = result.rows
    return rows.map(
        row => {
            return{
                organizacion : row.nombre_comercial,
                titulo : row.titulo,
                accion : row.accion,
                fecha : row.fecha
            }
        }
    )
}

module.exports = { create, findById, findByIdEvento, countHistoricosEventos, findAllHistoricos }