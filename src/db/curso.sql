CREATE TABLE cursos(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_publicacion DATE NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_final DATE NOT NULL,
    estado VARCHAR(150) NOT NULL,
    id_organizacion UUID NOT NULL,
    CONSTRAINT fk_cursos_organizacion
    FOREIGN KEY (id_organizacion)
    REFERENCES organizaciones(id)
)