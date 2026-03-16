CREATE TABLE usuarios(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    apellido_paterno VARCHAR(150) NOT NULL,
    apellido_materno VARCHAR(150) NOT NULL,
    rfc VARCHAR(150) NOT NULL,
    foto TEXT NOT NULL,
    banner TEXT NOT NULL,
    estado BOOLEAN NOT NULL,
    id_direccion UUID NOT NULL,
    id_contacto UUID NOT NULL,
    CONSTRAINT fk_usuarios_direcciones
    FOREIGN KEY (id_direccion)
    REFERENCES direciones(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_usuarios_contactos
    FOREIGN KEY (id_contacto)
    REFERENCES contactos(id)
    ON DELETE CASCADE
)