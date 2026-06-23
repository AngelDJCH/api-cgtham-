CREATE TABLE inscripcionEvento(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    estado VARCHAR(20) NOT NULL,
    fecha DATE NOT NULL,
    id_evento UUID NOT NULL,
    id_organizacion UUID NOT NULL,
    CONSTRAINT fk_inscripciones_evento
    FOREIGN KEY (id_evento)
    REFERENCES eventos(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_inscripciones_organizaciones
    FOREIGN KEY (id_organizacion)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
);
