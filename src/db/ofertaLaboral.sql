CREATE TABLE ofertaslaborales(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    salario FLOAT NOT NULL,
    jornada VARCHAR(150) NOT NULL,
    tipo_contrato VARCHAR(150) NOT NULL,
    vacantes INTEGER NOT NULL,
    beneficios TEXT NOT NULL,
    habilidades_tecnicas TEXT NOT NULL,
    habilidades_blandas TEXT NOT NULL,
    departamento_area VARCHAR(50) NOT NULL,
    modalidad VARCHAR(150) NOT NULL,
    experiencia VARCHAR(150) NOT NULL,
    estado VARCHAR(150) NOT NULL,
    fecha_publicacion DATE NOT NULL,
    id_empresa UUID NOT NULL,
    documento TEXT NOT NULL,
    CONSTRAINT fk_ofertaslaborales_empresa
    FOREIGN KEY (id_empresa)
    REFERENCES empresas(id)
);