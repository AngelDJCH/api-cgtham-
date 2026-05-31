CREATE TABLE ofertaeducativa(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    duracion VARCHAR(10) NOT NULL,
    perfil TEXT NOT NULL,
    id_escuela UUID NOT NULL,
    CONSTRAINT fk_ofertaeducativa_escuela
    FOREIGN KEY (id_escuela)
    REFERENCES escuelas(id)
);
