CREATE TABLE organizaciones(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    nombre_comercial VARCHAR(254) NOT NULL,
    descripcion TEXT NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    sector VARCHAR(150) NOT NULL,
    tamaño INTEGER NOT NULL,
    giro VARCHAR(150) NOT NULL,
    rfc VARCHAR(30) NOT NULL,
    logo TEXT NOT NULL,
    banner TEXT NOT NULL,
    estado BOOLEAN NOT NULL,
    id_contacto UUID NOT NULL,
    id_direccion UUID NOT NULL,
    CONSTRAINT fk_organizaciones_contacto
    FOREIGN KEY (id_contacto)
    REFERENCES contactos(id),
    CONSTRAINT fk_organizaciones_direccion
    FOREIGN KEY (id_direccion)
    REFERENCES direciones(id)
);