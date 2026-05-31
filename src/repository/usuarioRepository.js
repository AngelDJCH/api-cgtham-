const pool = require('../config/postgres');
const Usuario = require('../models/usuario');

const queryCreate = `
    INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, rfc, foto, banner,estado, id_direccion, id_contacto, id_organizacion) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *
`

const queryFindById = `
    SELECT * FROM usuarios AS u WHERE u.id = $1
`

const queryFindAll = `
    SELECT * FROM usuarios
`

const queryUpdateById = `
    UPDATE usuarios AS u 
    SET nombre = $1, apellido_paterno = $2, apellido_materno = $3, 
    rfc = $4, foto = $5, banner = $6 
    WHERE u.id = $7
    RETURNING *
`

const queryDeleteById = `
    DELETE FROM usuarios AS u WHERE u.id = $1    
`

const queryCountUsuarios = `
    SELECT COUNT(*) AS total FROM usuarios AS u WHERE u.estado = true
`

const queryFindPerfilById = `
    select u.foto, u.banner, concat(u.nombre, ' ', 
u.apellido_paterno, ' ', u.apellido_materno
) as nombre_completo, o.nombre_comercial, o.id as id_organizacion from cuentas as c
inner join usuarios as u on c.id_usuario = u.id 
inner join organizaciones as o on u.id_organizacion = o.id
where u.id = $1
`

const create = async (nombre, apellido_paterno, apellido_materno, rfc, foto, banner, estado, id_direccion, id_contacto, id_organizacion) => {
    const result = await pool.query(queryCreate, [nombre, apellido_paterno, apellido_materno, rfc, foto, banner, estado, id_direccion, id_contacto, id_organizacion])
    if (result.rowCount === 0) { throw new Error(`Datos no validos: \n Nombre: ${nombre} \n Apellido Paterno: ${apellido_paterno} \n Apellido Materno: ${apellido_materno} \n RFC: ${rfc} \n Foto: ${foto} \n Banner: ${banner} \n Id_direccion: ${id_direccion} \n Id_contacto: ${id_contacto}`) }
    const row = result.rows[0];
    return new Usuario(row.id, row.nombre, row.apellido_paterno, row.apellido_materno, row.rfc, row.foto, row.banner, row.estado, row.id_direccion, row.id_contacto, row.id_organizacion);
}

const findAll = async () => {
    const result = await pool.query(queryFindAll);
    return result.rows.map(
        row => new Usuario(row.id, row.nombre, row.apellido_paterno, row.apellido_materno, row.rfc, row.foto, row.banner, row.estado, row.id_direccion, row.id_contacto, row.id_organizacion)
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id])
    if (result.rowCount === 0) { throw new Error(`El ID ${id} no existe`) }
    const row = result.rows[0]
    return new Usuario(row.id, row.nombre, row.apellido_paterno, row.apellido_materno, row.rfc, row.foto, row.banner, row.estado, row.id_direccion, row.id_contacto, row.id_organizacion);
}

const updateById = async (id, nombre, apellido_paterno, apellido_materno, rfc, foto, banner) => {
    const exist = await pool.query(queryFindById, [id])
    if (exist.rowCount === 0) { throw new Error(`El ID ${id} no existe`) }
    const result = await pool.query(queryUpdateById, [nombre, apellido_paterno, apellido_materno, rfc, foto, banner, id]);
    const row = result.rows[0];
    return new Usuario(row.id, row.nombre, row.apellido_paterno, row.apellido_materno, row.rfc, row.foto, row.banner, row.estado, row.id_direccion, row.id_contacto, row.id_organizacion);
}

const deleteById = async (id) => {
    const exist = await pool.query(queryFindById, [id])
    if (exist.rowCount === 0) { throw new Error(`El ID ${id} no existe`) }
    const result = await pool.query(queryDeleteById, [id]);
    if (result.rowCount === 0) { throw new Error(`No se pudo eliminar el usuario`) }
    return exist;
}

const countUsuarios = async () => {
    const result = await pool.query(queryCountUsuarios)
    return result.rows[0] ? parseInt(result.rows[0].total) : 0 
}

const findPerfilById =  async (id_usuario) => {
    const result = await pool.query(queryFindPerfilById, [id_usuario])
    const row = result.rows[0]
    return{
        foto :  row.foto,
        banner : row.banner,
        nombre_completo : row.nombre_completo,
        organizacion : {
            id : row.id_organizacion,
            nombre_comercial : row.nombre_comercial
        }
    }
}

module.exports = { create, findById, findAll, updateById, deleteById, countUsuarios, findPerfilById}