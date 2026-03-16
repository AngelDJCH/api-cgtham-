CREATE TABLE direciones(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    calle VARCHAR(150) NOT NULL,
    numero VARCHAR(25) NOT NULL,
    colonia VARCHAR(150) NOT NULL,
    codigo_postal VARCHAR(20) NOT NULL,
    ciudad VARCHAR(150) NOT NULL,
    estado VARCHAR(150) NOT NULL,
    pais VARCHAR(150) NOT NULL
)