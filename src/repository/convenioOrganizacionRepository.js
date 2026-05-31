const pool = require('../config/postgres')
const ConvenioOrganizacion = require('../models/convenioOrganizacion')

const queryCreate = `
    INSERT INTO convenioorganizacion (rol, id_convenio, estado, id_organizacion) 
    VALUES($1,$2,$3,$4) RETURNING *
`

const queryFindById = `
    SELECT * FROM convenioorganizacion AS co WHERE co.id = $1
`

const queryUpdateRolFindById = `
    UPDATE convenioorganizacion AS co SET rol = $1 WHERE co.id = $2 RETURNING *
`

const queryFindAll = `
    SELECT c.id as id_convenio, c.titulo, c.descripcion, c.tipo, c.subtipo,  c.estado, 
    c.fecha_registro, c.fecha_inicio, c.fecha_final, co.id as 
    id_convenio_organizacion, co.rol, co.id_organizacion, co.estado, o.id as
    id_organizacion, o.nombre_comercial, o.logo
    FROM convenios AS c INNER JOIN convenioorganizacion AS co on c.id = co.id_convenio
    INNER JOIN organizaciones AS o on o.id = co.id_organizacion
`
//    WHERE co.rol = 'PROPIETARIO'
const queryParticipantesById = `
select c.id as id_convenio_organizacion, c.id_convenio as id_convenio, o.id as id_organizacion,
o.nombre_comercial, o.logo, c.estado
from convenioorganizacion as c inner join organizaciones as o on c.id_organizacion = o.id
where c.rol = 'PARTICIPANTE' and c.id_convenio = $1
`

const queryUpdateEstadoById = `
    UPDATE convenioorganizacion set estado = $1 where id = $2 RETURNING *
`

const findAllParticipantesById = async (id_convenio) => {
    const result = await pool.query(queryParticipantesById, [id_convenio])
    const rows = result.rows
    return rows.map(
        row => {
            return {
                id_convenio_organizacion: row.id_convenio_organizacion,
                id_convenio: row.id_convenio,
                estado: row.estado,
                organizacion: {
                    id: row.id_organizacion,
                    nombre: row.nombre_comercial,
                    logo: row.logo
                }
            }
        }
    )
}

const create = async (rol, id_convenio, id_organizacion) => {
    const estado = rol === 'ANFITRION' ? true : false
    const result = await pool.query(queryCreate, [rol, id_convenio, estado, id_organizacion])
    if (result.rowCount === 0) throw new Error('Ocurrio un error al crear un convenio con la organizacion')
    const row = result.rows[0]
    return new ConvenioOrganizacion(
        row.id,
        row.rol,
        row.estado,
        row.id_convenio,
        row.id_organizacion
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al buscar el elemento con el ID ${id}`)
    const row = result.rows[0]
    return new ConvenioOrganizacion(
        row.id,
        row.rol,
        row.estado,
        row.id_convenio,
        row.id_organizacion
    )
}

const updateRolById = async (id, rol) => {
    const result = await pool.query(queryUpdateRolFindById, [rol, id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al actualizar el rol del convenio empresa con ID ${id}`)
    const row = result.rows[0]
    return new ConvenioOrganizacion(
        row.id,
        row.rol,
        row.estado,
        row.id_convenio,
        row.id_organizacion
    )
}

const findAll = async () => {
    const result = await pool.query(queryFindAll)
    const rows = result.rows
    return rows.map(
        row => {
            return {
                convenio: {
                    id: row.id_convenio,
                    titulo: row.titulo,
                    descripcion: row.descripcion,
                    tipo: row.tipo,
                    subtipo: row.subtipo,
                    estado: row.estado_convenio,
                    fecha_registro: row.fecha_registro,
                    fecha_inicio: row.fecha_inicio,
                    fecha_final: row.fecha_final
                },
                organizacion: {
                    id: row.id_organizacion,
                    nombre_comercial: row.nombre_comercial,
                    logo: row.logo
                },
                convenio_organizacion: {
                    id: row.id_convenio_organizacion,
                    rol: row.rol,
                    estado: row.estado_participacion
                }
            }
        }
    )
}

const updateEstadoById = async (id_convenio_organizacion, estado) => {
    const result = await pool.query(queryUpdateEstadoById, [estado, id_convenio_organizacion])
    const row = result.rows[0]
    return new ConvenioOrganizacion(
        row.id,
        row.rol,
        row.estado,
        row.id_convenio,
        row.id_organizacion
    )
}

const deleteById = async (id_convenio_organizacion) => {
    const result = await pool.query('delete from convenioorganizacion where id = $1 returning *', [id_convenio_organizacion])
    const row = result.rows[0]
    return new ConvenioOrganizacion(
        row.id,
        row.rol,
        row.estado,
        row.id_convenio,
        row.id_organizacion
    )
}

const deleteByIdConvenio = async (id_convenio) => {
    const result = await pool.query('delete from convenioorganizacion where id_convenio = $1')
    const eliminados = result.rowCount
    return eliminados
}

module.exports = { create, findById, updateRolById, findAll, findAllParticipantesById,deleteById, updateEstadoById, deleteByIdConvenio}