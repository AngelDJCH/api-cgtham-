CREATE TABLE convenios(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    tipo VARCHAR(150) NOT NULL,
    estado VARCHAR(150) NOT NULL,
    fecha_registro DATE NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_final DATE NOT NULL
)