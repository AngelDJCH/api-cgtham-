CREATE TABLE inscripciones(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    estado VARCHAR(20) NOT NULL,
    fecha DATE NOT NULL,
    id_evento UUID NOT NULL,
    id_usuario UUID NOT NULL,
    CONSTRAINT fk_inscripciones_evento
    FOREIGN KEY (id_evento)
    REFERENCES eventos(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_inscripciones_usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id)
    ON DELETE CASCADE
)