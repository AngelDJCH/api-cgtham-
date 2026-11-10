const { parse } = require('dotenv')
const pool = require('../config/postgres')
const Organizacion = require('../models/organizacion')
const queryCreate = `
    INSERT INTO organizaciones (
        nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, estado, id_contacto, id_direccion
    ) VALUES (
        $1, $2, $3, $4,$5, $6, $7,  $8, $9, false, $10, $11
    ) 
    RETURNING *
`

const queryFindById = `
    SELECT * FROM organizaciones AS o WHERE o.id = $1
`

const queryFindAll = `
    SELECT * FROM organizaciones WHERE estado = true AND tipo != 'Comité' AND nombre_comercial NOT ILIKE '%cgtham%'
`

const queryCountOrganizaciones = `
    SELECT COUNT(*) AS total FROM organizaciones AS o WHERE o.estado = true AND o.tipo != 'Comité' AND o.nombre_comercial NOT ILIKE '%cgtham%'
`

const queryUpdateById = `
    UPDATE organizaciones AS o SET 
    nombre_comercial = $1, descripcion = $2, tipo = $3, sector = $4, tamaño = $5, giro = $6, rfc = $7
    WHERE o.id = $8
    RETURNING *
`

const queryDeleteById = `
    DELETE FROM organizaciones WHERE id = $1
`

const queryUpdateLogoByIdOrganizacion = `
    UPDATE organizaciones as o SET logo = $1 WHERE o.id = $2 RETURNING * 
`

const queryUpdateBannerByIdOrganizacion = `
    UPDATE organizaciones as o SET banner = $1 WHERE o.id = $2 RETURNING * 
`


const queryFindAllNoAprobadas = `
select 
o.id as id_organizacion, o.nombre_comercial, o.descripcion, o.tipo, o.sector, o.tamaño,
o.giro, o.rfc, o.logo, o.banner, o.estado as estado_organizacion, c.id as id_contacto,  c.correo, c.telefono,
d.id as id_direccion, d.calle, d.numero, d.colonia, d.codigo_postal, d.ciudad, d.estado, d.pais,
cc.id as id_cloud, cc.nombre, cc.clave, cc.clave_secreta
from organizaciones as o
inner join contactos as c on o.id_contacto = c.id
inner join direcciones as d on o.id_direccion = d.id
inner join cloudinaryconfig as cc on cc.id_organizacion = o.id
`

const queryFindByIdFast = `
select 
o.id as id_organizacion, o.nombre_comercial, o.descripcion, o.tipo, o.sector, o.tamaño,
o.giro, o.rfc, o.logo, o.banner, o.estado as estado_organizacion, c.id as id_contacto,  c.correo, c.telefono,
d.id as id_direccion, d.calle, d.numero, d.colonia, d.codigo_postal, d.ciudad, d.estado, d.pais,
cc.id as id_cloud, cc.nombre, cc.clave, cc.clave_secreta
from organizaciones as o
inner join contactos as c on o.id_contacto = c.id
inner join direcciones as d on o.id_direccion = d.id
inner join cloudinaryconfig as cc on cc.id_organizacion = o.id where o.id = $1
`

const queryFindLogoByIdOrganizacion = `
    SELECT logo FROM organizaciones WHERE id = $1
`


const queryUpdateEstadoById = `
    UPDATE organizaciones SET estado = $1 WHERE id = $2 RETURNING *
`

const findLogoByIdOrganizacion = async (id) => {
    const result = await pool.query(queryFindLogoByIdOrganizacion, [id])
    const row = result.rows[0]
    return {
        logo : row.logo
    }
}

const updateEstadoById = async (id, estado) => {
    const result = await pool.query(queryUpdateEstadoById, [estado, id])
    const row = result.rows[0]
    return {
        id : row.id,
        estado : row.estado
    }
}

const findByIdFast = async (id_organizacion) => {
    const result = await pool.query(queryFindByIdFast, [id_organizacion])
    const row = result.rows[0]
    return {
        organizacion: {
            id: row.id_organizacion,
            nombre: row.nombre_comercial,
            descripcion: row.descripcion,
            tipo: row.tipo,
            sector: row.sector,
            tamaño: row.tamaño,
            giro: row.giro,
            rfc: row.rfc,
            logo: row.logo,
            banner: row.banner,
            estado: row.estado_organizacion
        },
        contacto: {
            id: row.id_contacto,
            correo: row.correo,
            telefono: row.telefono
        },
        direccion: {
            id: row.id_direccion,
            calle: row.calle,
            numero: row.numero,
            colonia: row.colonia,
            codigo_postal: row.codigo_postal,
            ciudad: row.ciudad,
            estado: row.estado,
            pais: row.pais
        },
        cloud: {
            id: row.id_cloud,
            nombre: row.nombre,
            clave: row.clave,
            clave_secreta: row.clave_secreta
        }
    }
}


const findAllNoAprobadas = async () => {
    const result = await pool.query(queryFindAllNoAprobadas)
    const rows = result.rows
    return rows.map(
        row => {
            return {
                organizacion: {
                    id: row.id_organizacion,
                    nombre: row.nombre_comercial,
                    descripcion: row.descripcion,
                    tipo: row.tipo,
                    sector: row.sector,
                    tamaño: row.tamaño,
                    giro: row.giro,
                    rfc: row.rfc,
                    logo: row.log,
                    banner: row.banner,
                    estado: row.estado_organizacion
                },
                contacto: {
                    id: row.id_contacto,
                    correo: row.correo,
                    telefono: row.telefono
                },
                direccion: {
                    id: row.id_direccion,
                    calle: row.calle,
                    numero: row.numero,
                    colonia: row.colonia,
                    codigo_postal: row.codigo_postal,
                    ciudad: row.ciudad,
                    estado: row.estado,
                    pais: row.pais
                },
                cloud: {
                    id: row.id_cloud,
                    nombre: row.nombre,
                    clave: row.clave,
                    clave_secreta: row.clave_secreta
                }
            }
        }
    )
}

const updateLogoByIdOrganizacion = async (logo, id_organizacion) => {
    const result = await pool.query(queryUpdateLogoByIdOrganizacion, [logo, id_organizacion])
    return result.rowCount > 0 ? true : false
}


const updateBannerByIdOrganizacion = async (banner, id_organizacion) => {
    const result = await pool.query(queryUpdateBannerByIdOrganizacion, [banner, id_organizacion])
    return result.rowCount > 0 ? true : false
}


const create = async (nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id_contacto, id_direccion) => {
    const result = await pool.query(queryCreate, [nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id_contacto, id_direccion])
    const row = result.rows[0]
    return new Organizacion(
        row.id,
        row.nombre_comercial,
        row.descripcion,
        row.tipo,
        row.sector,
        row.tamaño,
        row.giro,
        row.rfc,
        row.logo,
        row.banner,
        row.id_contacto,
        row.id_direccion
    )
}

const findById = async (id) => {
    const result = await pool.query(queryFindById, [id]);
    if (result === 0) { throw new Error(`El ID ${id} no fue encontrada`) }
    const row = result.rows[0];
    return new Organizacion(
        row.id,
        row.nombre_comercial,
        row.descripcion,
        row.tipo,
        row.sector,
        row.tamaño,
        row.giro,
        row.rfc,
        row.logo,
        row.banner,
        row.estado,
        row.id_contacto,
        row.id_direccion
    )
}

const findAll = async () => {
    const result = await pool.query(queryFindAll);
    const organizaciones = result.rows.map(row => new Organizacion(
        row.id,
        row.nombre_comercial,
        row.descripcion,
        row.tipo,
        row.sector,
        row.tamaño,
        row.giro,
        row.rfc,
        row.logo,
        row.banner,
        row.id_contacto,
        row.id_direccion
    ));
    return organizaciones;
}

const updateById = async (id, nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc) => {
    const result = await pool.query(queryUpdateById, [nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, id])
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al actualizar los datos de la ID: ${id}`)
    const row = result.rows[0]
    return new Organizacion(
        row.id,
        row.nombre_comercial,
        row.descripcion,
        row.tipo,
        row.sector,
        row.tamaño,
        row.giro,
        row.rfc,
        row.logo,
        row.banner,
        row.id_contacto,
        row.id_direccion
    )
}

const deleteById = async (id) => {
    const exits = await pool.query(queryFindById, [id]);
    if (!exits) throw new Error(`No existe la organización con el ID ${id}`)
    const result = await pool.query(queryDeleteById, [id]);
    if (result.rowCount === 0) throw new Error(`Ocurrio un error al eliminar la organziación`)
    const row = exits.rows[0]
    return new Organizacion(
        row.id,
        row.nombre_comercial,
        row.descripcion,
        row.tipo,
        row.sector,
        row.tamaño,
        row.giro,
        row.rfc,
        row.logo,
        row.banner,
        row.id_contacto,
        row.id_direccion
    )
}


const countOrganizaciones = async () => {
    const result = await pool.query(queryCountOrganizaciones)
    return result.rows[0] ? parseInt(result.rows[0].total) : 0
}


module.exports = {findLogoByIdOrganizacion, updateEstadoById, findByIdFast, findAllNoAprobadas, create, findById, findAll, updateById, deleteById, countOrganizaciones, updateLogoByIdOrganizacion, updateBannerByIdOrganizacion }