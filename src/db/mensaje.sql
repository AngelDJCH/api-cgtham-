CREATE TABLE mensajes(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    contenido TEXT NOT NULL,
    id_emisor UUID NOT NULL,
    id_receptor UUID NOT NULL,
    CONSTRAINT fk_mensajes_usuario_emisor
    FOREIGN KEY (id_emisor)
    REFERENCES usuarios(id),
    CONSTRAINT fk_mensajes_usuarios_receptor
    FOREIGN KEY (id_receptor)
    REFERENCES usuarios(id)
)