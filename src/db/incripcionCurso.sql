
CREATE TABLE inscripcioncurso(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    fecha_inscripcion DATE NOT NULL,
    fecha_estado DATE NOT NULL,
    estado VARCHAR(100) NOT NULL,
    id_curso UUID NOT NULL,
    id_organizacion UUID NOT NULL,
    CONSTRAINT fk_inscripcioncurso_curso
    FOREIGN KEY (id_curso)
    REFERENCES cursos(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_inscripcioncurso_organizacion
    FOREIGN KEY (id_organizacion)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
)