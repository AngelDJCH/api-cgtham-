const pool = require('../config/postgres')
const HistoricoOferta = require('../models/historicoOferta')

const queryCreate = `
    INSERT INTO historicosoferta (fecha, accion, id_oferta, id_cuenta)
    VALUES(now(),$1,$2,$3) RETURNING *
`
const queryFindByIdOferta = `
    SELECT * FROM historicosoferta AS hf WHERE hf.id_oferta = $1
`
const queryFindById = `
    SELECT * FROM historicosoferta AS hf WHERE hf.id = $1
`

const queryCountHistoricosOfertas = `
    SELECT COUNT(*) AS total FROM historicosoferta
`

const queryFindAll = `
select 
o.nombre_comercial, ofl.titulo, h.accion, h.fecha
from historicosoferta
as h inner join ofertaslaborales as ofl on h.id_oferta = ofl.id
inner join cuentas as c on c.id = h.id_cuenta
inner join organizaciones as o on o.id = c.id_organizacion
`

const create = async (accion, id_oferta, id_usuario) => {
    const result = await pool.query(queryCreate, [accion, id_oferta, id_usuario])
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

const countHistoricosOfertas = async () => {
    const result = await pool.query(queryCountHistoricosOfertas)
    const row = result.rows[0].total
    return {
        historicos: row
    }
}

const findAllHistoricos = async () => {
    const result = await pool.query(queryFindAll)
    const rows = result.rows
    return rows.map(
        row => {
            return {
                organizacion: row.nombre_comercial,
                titulo: row.titulo,
                accion: row.accion,
                fecha: row.fecha
            }
        }
    )
}

module.exports = { create, findById, findByIdOferta, countHistoricosOfertas, findAllHistoricos }