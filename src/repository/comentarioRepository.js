const pool = require('../config/postgres')
const Comentario = require('../models/comentario')

const queryCreate = `
    INSERT INTO comentarios (contenido, estado, id_organizacion, fecha)
    VALUES ($1,$2,$3,now()) RETURNING *
`
const queryFindById = `
    SELECT * FROM comentarios AS c WHERE c.id = $1
`
const queryFindAllByUsuario = `
    SELECT * FROM comentarios WHERE id_organizacion = $1
`

const queryComentariosByIdOrganizacion = `
    SELECT * FROM comentarios as c 
    WHERE c.id_organizacion = $1
`;

const queryFindAllComentariosByAdministrador = `
    select o.id as id_organizacion, o.nombre_comercial, c.id as id_comentario, c.contenido, c.fecha, c.estado from comentarios as c inner join organizaciones as o on c.id_organizacion = o.id where c.estado = 'Pendiente' and c.id_administrador is null
	order by c.fecha desc
`

const queryFindAllComentarios = `
    select o.logo, o.nombre_comercial, c.fecha, c.contenido from comentarios as c 
    inner join organizaciones as o on c.id_organizacion = o.id where c.estado = 'Aprobado' order by fecha desc limit 3 
`


const queryFindAll = `
    SELECT * FROM comentarios AS c WHERE c.estado =  $1 AND c.id_administrador IS NOT NULL LIMIT $2
`

const queryUpdateContenidoById = `
    UPDATE comentarios AS c SET contenido = $1 WHERE c.id = $2 RETURNING *
`

const queryUpdateEstadoById = `
    UPDATE comentarios AS c SET estado = $1, id_administrador = $2 WHERE c.id = $3 RETURNING *
`

const queryDeleteById = `
    DELETE FROM comentarios AS c WHERE c.id = $1 RETURNING *
`

const queryCount = `select count(*) as total from comentarios`


const create = async (contenido, estado, id_usuario) => {
    const result = await pool.query(queryCreate, [contenido, estado, id_usuario])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al crear un comentario')
    const row = result.rows[0]
    return new Comentario(
        row.id,
        row.contenido,
        row.estado,
        row.id_administrador,
        row.id_organizacion,
        row.fecha
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al obtener el comentario')
    const row = result.rows[0]
    return new Comentario(
        row.id,
        row.contenido,
        row.estado,
        row.id_administrador,
        row.id_usuario,
        row.fecha
    )
}

const findAllByIdUsuario = async (id_organizacion) => {
    const result = await pool.query(queryComentariosByIdOrganizacion, [id_organizacion])
    // if (result.rowCount === 0) throw new Error('Ocurrio un error al obtener los comentarios del usuario')
    const rows = result.rows
    return rows.map(
        row => new Comentario(
            row.id,
            row.contenido,
            row.estado,
            row.id_administrador,
            row.id_organizacion,
            row.fecha
        )
    )
}

const findAll = async (estado, limite) => {
    const result = await pool.query(queryFindAll, [estado, limite])
    const rows = result.rows
    return rows.map(
        row => new Comentario(
            row.id,
            row.contenido,
            row.estado,
            row.id_administrador,
            row.id_usuario,
            row.fecha
        )
    )
}

const updateContenidoById = async (id, contenido) => {
    const result = await pool.query(queryUpdateContenidoById, [contenido, id])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al actualizar el contenido del comentario')
    const row = result.rows[0]
    return new Comentario(
        row.id,
        row.contenido,
        row.estado,
        row.id_administrador,
        row.id_usuario,
        row.fecha
    )
}

const updateEstadoById = async (id, estado, id_administrador) => {
    const result = await pool.query(queryUpdateEstadoById, [estado, id_administrador, id])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al actualizar el estado del comentario')
    const row = result.rows[0]
    return new Comentario(
        row.id,
        row.contenido,
        row.estado,
        row.id_administrador,
        row.id_usuario,
        row.fecha
    )
}

const deleteById = async (id) => {
    const result = await pool.query(queryDeleteById, [id])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al intentar eliminar el comentario')
    const row = result.rows[0]
    return new Comentario(
        row.id,
        row.contenido,
        row.estado,
        row.id_administrador,
        row.id_usuario,
        row.fecha
    )
}

const findAllComentariosByAdministrador = async () => {
    const result = await pool.query(queryFindAllComentariosByAdministrador)
    const rows = result.rows
    return rows.map(
        row => {
            return {
                organizacion: {
                    id: row.id_organizacion,
                    nombre: row.nombre_comercial
                },
                comentario: {
                    id: row.id_comentario,
                    contenido: row.contenido,
                    fecha: row.fecha,
                    estado: row.estado
                }
            }
        }
    )
}

const findAllComentarios = async () => {
    const result = await pool.query(queryFindAllComentarios)
    const rows = result.rows
    return rows.map(
        row => {
            return{
                organizacion : {
                    nombre : row.nombre_comercial,
                    foto : row.logo
                },
                comentario : {
                    fecha : row.fecha,
                    contenido : row.contenido
                }
            }
        }
    )
}

module.exports = { create, findById, findAllByIdUsuario, findAll, updateContenidoById, updateEstadoById, deleteById, findAllComentariosByAdministrador, findAllComentarios}