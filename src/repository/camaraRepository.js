const pool = require('../config/postgres')
const Camara = require('../models/camara')

const queryCreate = `
    INSERT INTO camaras (id, nombre, presidente) 
    VALUES ($1,$2,$3) RETURNING *
`

const queryFindById = `
    SELECT * FROM camaras AS c WHERE c.id = $1
`

const queryFindAll = `
    SELECT *  FROM camaras
`

const queryUpdateById = `
    UPDATE camaras AS c SET nombre = $1, presidente = $2
    WHETE c.id = $3 RETURNING *
`

const queryDeleteById = `
    DELETE FROM camaras AS c WHERE c.id = $1
`

const create = async (id_organizacion, nombre, presidente) => {
    const result = await pool.query(queryCreate, [id_organizacion, nombre, presidente])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al crear una nueva camara de comercio`)
    const row = result.rows[0]
    return new Camara(
        row.id,
        row.nombre,
        row.presidente
    )
}

const findById = async (id_organizacion) => {
    const result = await pool.query(queryFindById, [id_organizacion])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al obtener la camara de comercio`)
    const row = result.rows[0]
    return new Camara(
        row.id,
        row.nombre,
        row.presidente
    )
}

const findAll = async () => {
    const result = await pool.query(queryFindAll)
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al obtener las camaras de comercio`)
    const rows = result.rows;
    return rows.map(
        row => new Camara(
            row.id,
            row.nombre,
            row.presidente
        )
    )
}

const updateById = async (id_organizacion, nombre, presidente) => {
    const result = await pool.query(queryUpdateById, [nombre, presidente, id_organizacion])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al actualizar los campos de la camara de comercio con ID ${id_organizacion}`)
    const row = result.rows[0]
    return new Camara(
        row.id,
        row.nombre,
        row.presidente
    )
}

const deleteById = async (id_organizacion) => {
    const exist = await pool.query(queryDeleteById, [id_organizacion])
    if (exist.rowCount === 0) throw new Error(`Ocurrio un error al obtener la camra de comercio`)
    const row = exist.rows[0]
    const result = await pool.query(queryDeleteById, [id_organizacion])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al intentar eliminar la camara de comercio con ID: ${id_organizacion}`)
    return new Camara(
        row.id,
        row.nombre,
        row.presidente
    )
}

module.exports = {create, findById, findAll, updateById, deleteById}