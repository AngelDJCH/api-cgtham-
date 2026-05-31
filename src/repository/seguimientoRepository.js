const pool = require('../config/postgres')
const Seguimiento = require('../models/seguimiento')

const queryCreate = `
    INSERT INTO seguimientos (fecha, id_seguido, id_seguidor) 
    VALUES($1,$2,$3) RETURNING *
`

const queryFindAllSeguidoresById = `
select u.id as id_usuario, u.foto, concat(u.nombre,' ', u.apellido_paterno, ' ',
u.apellido_materno) as 
nombre_completo from seguimientos as s
inner join usuarios as u on s.id_seguidor = u.id
where id_seguido = $1;
`
const queryFindAllSeguidosById = `
    SELECT * FROM seguimientos AS s WHERE 
    s.id_seguidor = $1
`

const queryDeleteSeguidorOrSeguido= `
    DELETE FROM seguimientos AS s 
    WHERE s.id_seguidor = $1 AND s.id_seguido = $2
    RETURING *
`

const create = async (fecha, id_seguido, id_seguidor) => {
    const result = await pool.query(queryCreate, [fecha, id_seguido, id_seguidor])
    if(result.rowCount === 0) throw new Error(`No se pudo establecer el seguimiento`)
    const row = result.rows[0]
    return new Seguimiento(
        row.id,
        row.fecha,
        row.id_seguido,
        row.id_seguidor
    )
}

const findAllSeguidosById = async (id_seguidor) => {
    const result = await pool.query(queryFindAllSeguidosById, [id_seguidor])
    const rows = result.rows
    return rows.map(
        row => new Seguimiento(
            row.id,
            row.fecha,
            row.id_seguido,
            row.id_seguidor
        )
    )
} 

const findAllSeguidoresById = async (id_seguido) => {
    const result = await pool.query(queryFindAllSeguidoresById, [id_seguido])
    const rows = result.rows
    return rows.map(
        row => {
            return{
                id : row.id_usuario,
                foto : row.foto,
                nombre : row.nombre_completo
            }
        }
    )
}

const deleteSeguidorOrSeguido = async (id_seguido, id_seguidor) => {
    const result = await pool.query(queryDeleteSeguidorOrSeguido, [id_seguidor, id_seguido])
    if(result.rowCount === 0) throw new Error(`No se pudo eliminar el seguimiento`)
    const row = result.rows[0]
    return new Seguimiento(
        row.id,
        row.fecha,
        row.id_seguido,
        row.id_seguidor
    )
}

module.exports = {create, findAllSeguidosById, findAllSeguidoresById, deleteSeguidorOrSeguido}