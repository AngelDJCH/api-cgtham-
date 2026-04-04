const pool = require('../config/postgres')
const Cuenta = require('../models/cuenta')

const queryCreate = `
    INSERT INTO cuentas (correo, contrasenia, roles, id_usuario)
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
        SELECT c.correo, c.contrasenia,
	c.roles, u.id as id_usuario, u.foto
	FROM cuentas AS c inner join usuarios as u on c.id_usuario = u.id WHERE c.correo = $1
`

const create = async (correo, contrasenia, roles, id_usuario) => {
    const result = await pool.query(queryCreate, [correo, contrasenia, roles, id_usuario])
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
        correo : row.correo,
        contraseña : row.contrasenia,
        rol : row.roles,
        usuario : {
            id : row.id_usuario,
            foto : row.foto
        }
    }
}

module.exports = { create, findById, updateRolById, login}