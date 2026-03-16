const pool = require('../config/postgres');
const Escuela = require('../models/escuela');

const queryCreate = `
    INSERT INTO escuelas (id, tipo_institucion, url_sitio) VALUES($1, $2, $3) RETURNING * 
`

const queryFindById = `
    SELECT * FROM escuelas AS e WHERE e.id = $1
`

const queryFindAll = `
    SELECT * FROM escuelas
`

const queryUpdateById = `
    UPDATE escuelas AS e SET tipo_institucion = $1, url_sitio = $2 WHERE e.id = $3 RETURNING *
`

const queryDeleteById = `
    DELETE FROM escuelas AS e WHERE e.id = $1
`

const create = async (id_organizacion, tipo_institucion, url_sitio) => {
    const result = await pool.query(queryCreate, [id_organizacion, tipo_institucion, url_sitio]);
    if(result.rowCount === 0) throw new Error('Ocurrio un error al crear una escuela')
    const row = result.rows[0]
    return new Escuela(
        row.id,
        row.tipo_institucion,
        row.url_sitio
    )
}

const findById = async (id_organizacion) => {
    const result = await pool.query(queryFindById, [id_organizacion])
    if(result.rowCount === 0) throw new Error('ID no encontrada')
    const row = result.rows[0]
    return new Escuela(
        row.id,
        row.tipo_institucion,
        row.url_sitio
    )
}

const findAll =  async () => {
    const result = await pool.query(queryFindAll);
    if(result.rowCount === 0) throw new Error('Ocurrio un error - No hay escuelas')
    return result.rows.map(
        escuela => new Escuela(
            escuela.id,
            escuela.tipo_institucion,
            escuela.url_sitio
        )
    )
}

const updateById = async (id_organizacion, tipo_institucion, url_sitio) => {
    const exist = await pool.query(queryFindById, [id_organizacion])
    if(exist.rowCount === 0) throw new Error('ID no encontrada')
    const result = await pool.query(queryUpdateById,[tipo_institucion, url_sitio, id_organizacion])
    const row =  result.rows[0]
    return new Escuela(
        row.id,
        row.tipo_institucion,
        row.url_sitio
    )
}

const deleteById = async (id_organizacion) => {
    const exist = await pool.query(queryFindById, [id_organizacion])
    const row = exist.rows[0]
    if(exist.rowCount === 0) throw new Error('ID no encontrada')
    const result = await pool.query(queryDeleteById,[id_organizacion])
    if(result.rowCount === 0) throw new Error('Ocurrio un error al eliminar la escuela')
    return new Escuela(
        row.id,
        row.tipo_institucion,
        row.url_sitio
    )
}

module.exports = {create, findById, findAll, updateById, deleteById}