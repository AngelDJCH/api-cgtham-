const pool = require('../config/postgres')
const Cuenta = require('../models/cuenta')

const queryCreate = `
    INSERT INTO cuentas (correo, contrasenia, roles, id_organizacion)
    VALUES ($1,$2,$3,$4)
    RETURNING *
`

const queryFindById = `
    SELECT * FROM cuentas AS c
    WHERE c.id_usuario =  $1
`

const queryUpdateRol = `
    UPDATE cuentas AS c SET roles = $1 WHERE c.id_usuario = $2 RETURNING *
`

const queryLogin = `
	    SELECT c.id as id_cuenta,c.correo, c.contrasenia,
	c.roles, o.id as id_organizacion, o.logo, o.tipo, o.sector, o.giro
	FROM cuentas AS c inner join organizaciones as o on c.id_organizacion = o.id
	WHERE c.correo = $1 and o.estado = true
`

const queryUpdateCorreoByIdOrganizacion = `
    UPDATE cuentas SET correo = $1 WHERE id_organizacion = $2 RETURNING *
`

const queryUpdateContraseniaByIdOrganizacion = `
    UPDATE cuentas SET contrasenia = $1 WHERE id_organizacion = $2 RETURNING *
`

const queryFindByCorreo = `
    SELECT c.id as id_cuenta, c.correo, c.contrasenia,
    c.roles, o.id as id_organizacion, o.nombre_comercial, o.logo, o.tipo, o.estado
    FROM cuentas AS c INNER JOIN organizaciones AS o ON c.id_organizacion = o.id
    WHERE c.correo = $1
`

const queryUpdateContraseniaByCorreo = `
    UPDATE cuentas SET contrasenia = $1 WHERE correo = $2 RETURNING *
`

const updateCorreoByIdOrganizacion = async (correo, id_organizacion) => {
    const result = await pool.query(queryUpdateCorreoByIdOrganizacion, [correo, id_organizacion])
    const row = result.rows[0]
    return new Cuenta(
        row.id,
        row.correo,
        row.contrasenia,
        row.roles,
        row.id_usuario
    )
}


const updateContraseniaByIdOrganizacion = async (contrasenia, id_organizacion) => {
    const result = await pool.query(queryUpdateContraseniaByIdOrganizacion, [contrasenia, id_organizacion])
    const row = result.rows[0]
    return new Cuenta(
        row.id,
        row.correo,
        row.contrasenia,
        row.roles,
        row.id_usuario
    )
}


const create = async (correo, contrasenia, roles, id_organizacion) => {
    const result = await pool.query(queryCreate, [correo, contrasenia, roles, id_organizacion])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al crear una cuenta`)
    const row = result.rows[0]
    return new Cuenta(
        row.id,
        row.correo,
        row.contrasenia,
        row.roles,
        row.id_usuario
    )
}

const findById = async (id_usuario) => {
    const result = await pool.query(queryFindById, [id_usuario])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al obtener la cuenta`)
    const row = result.rows[0]
    return new Cuenta(
        row.id,
        row.correo,
        row.contrasenia,
        row.roles,
        row.id_usuario
    )
}

const updateRolById = async (id_usuario, roles) => {
    const result = await pool.query(queryUpdateRol, [roles, id_usuario])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al actualizar el Rol de la cuenta`)
    const row = result.rows[0]
    return new Cuenta(
        row.id,
        row.correo,
        row.contrasenia,
        row.roles,
        row.id_usuario
    )
}

const login = async (correo) => {
    const result = await pool.query(queryLogin, [correo])
    if (result.rowCount === 0) throw new Error('El correo ingresado es incorrecto')
    const row = result.rows[0]
    return {
        id: row.id_cuenta,
        correo: row.correo,
        contraseña: row.contrasenia,
        rol: row.roles,
        tipo: row.tipo,
        sector: row.sector,
        giro: row.giro,
        organizacion: row.id_organizacion,
        logo: row.logo
    }
}

const findByCorreo = async (correo) => {
    const result = await pool.query(queryFindByCorreo, [correo])
    if (result.rowCount === 0) return null
    return result.rows[0]
}

const updateContraseniaByCorreo = async (contrasenia, correo) => {
    const result = await pool.query(queryUpdateContraseniaByCorreo, [contrasenia, correo])
    if (result.rowCount === 0) throw new Error('No se pudo actualizar la contraseña de la cuenta')
    const row = result.rows[0]
    return new Cuenta(
        row.id,
        row.correo,
        row.contrasenia,
        row.roles,
        row.id_usuario
    )
}

module.exports = {
    create,
    findById,
    updateRolById,
    login,
    updateCorreoByIdOrganizacion,
    updateContraseniaByIdOrganizacion,
    findByCorreo,
    updateContraseniaByCorreo
}