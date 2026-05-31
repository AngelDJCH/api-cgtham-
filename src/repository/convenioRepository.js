const pool = require('../config/postgres')
const Convenio = require('../models/convenio')

const queryCreate = `
    INSERT INTO convenios (titulo, descripcion, tipo, subtipo, estado,archivo,fecha_registro, fecha_inicio, fecha_final)
    VALUES ($1,$2,$3,$4,$5,$6,now(),$7,$8) RETURNING *
`

const queryFindById = `
    SELECT * FROM convenios AS c WHERE c.id = $1
`

const queryFindAll = `
    SELECT
        c.id as id_convenio, c.titulo, c.tipo, c.subtipo, c.descripcion, o.id as id_organizacion ,o.nombre_comercial,
        c.fecha_registro, c.fecha_inicio, c.fecha_final
    FROM convenios as c inner join convenioorganizacion as co on c.id = co.id_convenio
    inner join organizaciones as o on co.id_organizacion = o.id
        where co.rol = 'ANFITRION'
`

const queryUpdateById = `
    UPDATE convenios AS c SET titulo = $1, descripcion = $2, tipo = $3,
    fecha_inicio = $4, fecha_final = $5 WHERE c.id = $6 RETURNING *
`

const queryDeleteById = `
    DELETE FROM convenios WHERE id = $1 RETURNING * 
`

const queryCountConvenios = `
    SELECT COUNT(*) AS total FROM convenios AS c WHERE c.estado = true
`

const queryDashCantidadConveniosPorTipo = `
select count(*) as value, tipo from convenios group by tipo
`

const dashCantidadConveniosPorTipo = async () => {
    const result = await pool.query(queryDashCantidadConveniosPorTipo)
    const rows = result.rows
    return rows.map(
        row => {
            return {
                tipo : row.tipo,
                value : row.value
            }
        }
    )
}


const create = async (titulo, descripcion, tipo, subtipo, estado, archivo, fecha_inicio, fecha_final) => {
    const result = await pool.query(queryCreate, [titulo, descripcion, tipo, subtipo, estado, archivo, fecha_inicio, fecha_final])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al agregar un nuevo convenio`)
    const row = result.rows[0]
    return new Convenio(
        row.id,
        row.titulo,
        row.descripcion,
        row.tipo,
        row.subtipo,
        row.estado,
        row.archivo,
        row.fecha_registro,
        row.fecha_inicio,
        row.fecha_final
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id])
    if (result.rowCount === 0) throw new Error(`No se encontro el ID ${id}`)
    const row = result.rows[0]
    return new Convenio(
        row.id,
        row.titulo,
        row.descripcion,
        row.tipo,
        row.subtipo,
        row.estado,
        row.archivo,
        row.fecha_registro,
        row.fecha_inicio,
        row.fecha_final
    )
}

const findAll = async () => {
    const result = await pool.query(queryFindAll)
    return result.rows.map(
        row => {
            return {
                id: row.id_convenio,
                titulo: row.titulo,
                tipo: row.tipo,
                subtipo: row.subtipo,
                descripcion: row.descripcion,
                organizacion: {
                    id: row.id_organizacion,
                    nombre: row.nombre_comercial
                },
                registro: row.fecha_registro,
                inicio: row.fecha_inicio,
                final: row.fecha_final
            }
        }
    )
}

const updateById = async (id, titulo, descripcion, tipo, fecha_inicio, fecha_final) => {
    const result = await pool.query(queryUpdateById, [titulo, descripcion, tipo, fecha_inicio, fecha_final, id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al actualizar el convenio`)
    const row = result.rows[0]
    return new Convenio(
        row.id,
        row.titulo,
        row.descripcion,
        row.tipo,
        row.subtipo,
        row.estado,
        row.archivo,
        row.fecha_registro,
        row.fecha_inicio,
        row.fecha_final
    )
}

const deleteById = async (id) => {
    const result = await pool.query(queryDeleteById, [id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al eliminar el convenio con el ID ${id}`)
    const row = result.rows[0]
    return {
        id: row.id,
        titulo: row.titulo,
        descripcion: row.descripcion,
        tipo: row.tipo,
        subtipo: row.subtipo,
        estado: row.estado,
        archivo: row.archivo,
        registro: row.fecha_registro,
        inicio: row.fecha_inicio,
        final: row.fecha_final
    }
}

const countConvenios = async () => {
    const result = await pool.query(queryCountConvenios)
    return result.rows[0] ? parseInt(result.rows[0].total) : 0
}

module.exports = {dashCantidadConveniosPorTipo, create, findById, findAll, updateById, deleteById, countConvenios }