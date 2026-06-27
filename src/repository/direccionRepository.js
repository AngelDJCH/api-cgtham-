const Direccion = require("../models/direccion");
const pool = require("../config/postgres");

const queryCreate = `
INSERT INTO direcciones
(calle, numero, colonia, codigo_postal, ciudad, estado, pais)
VALUES ($1,$2,$3,$4,$5,$6,$7)
RETURNING *
`;

const queryFindById = `
	select * from direcciones where id= $1
`;

const queryUpdate = `
UPDATE direcciones
SET calle = $1,
    numero = $2,
    colonia = $3,
    codigo_postal = $4,
    ciudad = $5,
    estado = $6,
    pais = $7
WHERE id = $8
RETURNING *
`;

const queryDeleteById = `
  DELETE FROM direcciones where id = $1
`

const deleteById = async (id) => {
  const result = await pool.query(queryDeleteById, [id])
  return result.rowCount > 0
}

const create = async (calle, numero, colonia, codigo_postal, ciudad, estado, pais) => {
  const result = await pool.query(queryCreate, [
    calle,
    numero,
    colonia,
    codigo_postal,
    ciudad,
    estado,
    pais
  ]);

  const row = result.rows[0];

  return new Direccion(
    row.id,
    row.calle,
    row.numero,
    row.colonia,
    row.codigo_postal,
    row.ciudad,
    row.estado,
    row.pais
  );
};

const findById = async (id) => {
  const result = await pool.query(queryFindById, [id]);

  if (result.rowCount === 0) return null;

  const row = result.rows[0];

  return new Direccion(
    row.id,
    row.calle,
    row.numero,
    row.colonia,
    row.codigo_postal,
    row.ciudad,
    row.estado,
    row.pais
  );
};

const updateById = async (
  id,
  calle,
  numero,
  colonia,
  codigo_postal,
  ciudad,
  estado,
  pais
) => {
  const exist = await pool.query(queryFindById, [id]);

  if (exist.rowCount === 0) {
    throw new Error(`El ID ${id} de la dirección no existe`);
  }

  const result = await pool.query(queryUpdate, [
    calle,
    numero,
    colonia,
    codigo_postal,
    ciudad,
    estado,
    pais,
    id
  ]);

  const row = result.rows[0];

  return new Direccion(
    row.id,
    row.calle,
    row.numero,
    row.colonia,
    row.codigo_postal,
    row.ciudad,
    row.estado,
    row.pais
  );
};

module.exports = {
  create,
  findById,
  updateById,
  deleteById
};