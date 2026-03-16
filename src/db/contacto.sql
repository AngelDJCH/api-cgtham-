CREATE TABLE contactos(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    correo VARCHAR(254) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);