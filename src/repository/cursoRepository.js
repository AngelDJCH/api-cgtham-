const pool = require('../config/postgres')
const Curso = require('../models/curso')

const queryCreate = `
    INSERT INTO cursos (titulo, descripcion, fecha_publicacion, fecha_inicio, fecha_final, estado, id_organizacion)
    VALUES ($1, $2, now(), $3, $4, $5, $6) RETURNING *
`

const queryFindToEmpresas = `
select 
c.id  as id_curso, c.titulo, c.descripcion, c.fecha_publicacion, c.fecha_inicio, c.fecha_final, c.estado,
o.id as id_organizacion, o.nombre_comercial, o.logo, o.banner
from cursos as c inner join organizaciones as o on c.id_organizacion = o.id
where c.estado = 'PUBLICADO'
`

const queryFindToEscuelas = `
select 
c.id  as id_curso, c.titulo, c.descripcion, c.fecha_publicacion, c.fecha_inicio, c.fecha_final, c.estado,
o.id as id_organizacion, o.nombre_comercial, o.logo, o.banner
from cursos as c inner join organizaciones as o on c.id_organizacion = o.id
where o.id = $1 and c.estado != 'ELIMINADO'
`

const queryFindById = `
select 
c.id as id_curso, c.titulo, c.descripcion, c.fecha_publicacion, c.fecha_inicio, c.fecha_final,
c.estado, o.id as id_organizacion, o.nombre_comercial, o.logo, o.banner
from cursos as c inner join organizaciones as o on c.id_organizacion = o.id
where c.id = $1
`

const queryUpdateById = `
    UPDATE cursos SET titulo = $1, descripcion = $2, fecha_inicio = $3, fecha_final = $4, estado = 'PUBLICADO' WHERE id = $5 RETURNING *
`

const queryUpdateEstadoById = `
    UPDATE cursos SET estado = $1 WHERE id = $2 RETURNING *
`

const querySolicitar = `
    INSERT INTO cursos (titulo, descripcion, fecha_publicacion, fecha_inicio, fecha_final, estado, id_organizacion)
    VALUES ($1, $2, now(), now(), now(), $3, $4) RETURNING *
`

const querySolicitudes = `
    select * from cursos where estado = 'SOLICITUD' and id_organizacion = $1
`
const queryUpdateByIdForPeticion = `
    UPDATE cursos SET titulo = $1, descripcion = $2, fecha_inicio = $3, fecha_final = $4 where id = $5  RETURNING * 
`

const updateByIdForPeticion = async (titulo, descripcion, fecha_inicio, fecha_final, id_curso) => {
    const result = await pool.query(updateByIdForPeticion, [titulo, descripcion, fecha_inicio, fecha_final, id_curso])
    const row = result.rows[0]
    return {
        id : row.id,
        titulo : row.titulo,
        descripcion : row.descripcion,
        publicado : row.fecha_publicacion,
        inicio : row.fecha_inicio,
        final : row.fecha_final,
        id_organizacion : row.id_organizacion
    }
}

const solicitudes = async (id_organizacion) => {
    const result = await pool.query(querySolicitudes, [id_organizacion])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id: row.id,
                titulo: row.titulo,
                descripcion: row.descripcion,
                publicado : row.fecha_publicacion,
                inicio: row.fecha_inicio,
                final: row.fecha_final,
                id_organizacion: row.id_organizacion
            }
        }
    )
}

const solicitar = async (titulo, descripcion, estado, id_organizacion) => {
    const result = await pool.query(querySolicitar, [titulo, descripcion, estado, id_organizacion])
    const row = result.rows[0]
    return {
        id: row.id,
        titulo: row.titulo,
        descripcion: row.descripcion,
        inicio: row.fecha_inicio,
        final: row.fecha_final,
        id_organizacion: row.id_organizacion
    }
}


const updateEstadoById = async (estado, id_curso) => {
    const result = await pool.query(queryUpdateEstadoById, [estado, id_curso])
    const row = result.rows[0]
    return {
        id: row.id,
        titulo: row.titulo,
        descripcion: row.descripcion,
        inicio: row.fecha_inicio,
        final: row.fecha_final,
        id_organizacion: row.id_organizacion
    }
}

const updateById = async (titulo, descripcion, fecha_inicio, fecha_final, id_curso) => {
    const result = await pool.query(queryUpdateById, [titulo, descripcion, fecha_inicio, fecha_final, id_curso])
    const row = result.rows[0]
    return {
        id: row.id,
        titulo: row.titulo,
        descripcion: row.descripcion,
        inicio: row.fecha_inicio,
        final: row.fecha_final,
        id_organizacion: row.id_organizacion
    }
}

const create = async (titulo, descripcion, fecha_inicio, fecha_final, estado, id_organizacion) => {
    const result = await pool.query(queryCreate, [titulo, descripcion, fecha_inicio, fecha_final, estado, id_organizacion])
    const row = result.rows[0]
    return new Curso(
        row.id,
        row.titulo,
        row.descripcion,
        row.fecha_publicacion,
        row.fecha_inicio,
        row.fecha_final,
        row.estado,
        row.id_organizacion
    )
}

const findAllToEmpresas = async () => {
    const result = await pool.query(queryFindToEmpresas)
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id: row.id_curso,
                titulo: row.titulo,
                descripcion: row.descripcion,
                publicado: row.fecha_publicacion,
                inicio: row.fecha_inicio,
                final: row.fecha_final,
                estado : row.estado,
                organizacion: {
                    id: row.id_organizacion,
                    nombre: row.nombre_comercial,
                    logo: row.logo,
                    banner: row.banner
                }
            }
        }
    )
}

const findAllToEscuelas = async (id_organizacion) => {
    const result = await pool.query(queryFindToEscuelas, [id_organizacion])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id: row.id_curso,
                titulo: row.titulo,
                descripcion: row.descripcion,
                publicado: row.fecha_publicacion,
                inicio: row.fecha_inicio,
                final: row.fecha_final,
                estado : row.estado,
                organizacion: {
                    id: row.id_organizacion,
                    nombre: row.nombre_comercial,
                    logo: row.logo,
                    banner: row.banner
                }
            }
        }
    )
}

const findById = async (id_curso) => {
    const result = await pool.query(queryFindById, [id_curso])
    const row = result.rows[0]
    return {
        id: row.id_curso,
        titulo: row.titulo,
        descripcion: row.descripcion,
        publicado: row.fecha_publicacion,
        inicio: row.fecha_inicio,
        final: row.fecha_final,
        estado: row.estado,
        organizacion: {
            id: row.id_organizacion,
            nombre: row.nombre_comercial,
            logo: row.logo,
            banner: row.banner
        }
    }
}

module.exports = { create, findAllToEmpresas, findAllToEscuelas, findById, updateById, updateEstadoById, solicitar, solicitudes,updateByIdForPeticion }