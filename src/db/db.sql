CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Se debe de crear la extensión para id con formato UUID
--Una vez ejecutada la extensión ya no es necesario volver a ejecutar este comando.

CREATE TABLE contactos(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    correo VARCHAR(254) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

CREATE TABLE direciones(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    calle VARCHAR(150) NOT NULL,
    numero VARCHAR(25) NOT NULL,
    colonia VARCHAR(150) NOT NULL,
    codigo_postal VARCHAR(20) NOT NULL,
    ciudad VARCHAR(150) NOT NULL,
    estado VARCHAR(150) NOT NULL,
    pais VARCHAR(150) NOT NULL
);

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
)

CREATE TABLE cloudinaryconfig(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    clave VARCHAR(254) NOT NULL,
    clave_secreta VARCHAR(254) NOT NULL,
    id_organizacion UUID NOT NULL,
    CONSTRAINT fk_organizaciones_cloudinary
    FOREIGN KEY (id_organizacion)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
);

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
);

CREATE TABLE camaras(
    id UUID NOT NULL PRIMARY KEY,
    nombre VARCHAR(254) NOT NULL,
    presidente VARCHAR(254) NOT NULL,
    CONSTRAINT fk_camara_org
    FOREIGN KEY(id)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
);

CREATE TABLE empresas(
    id UUID NOT NULL PRIMARY KEY,
    razon_social VARCHAR(254) NOT NULL,
    regimen_fiscal VARCHAR(254) NOT NULL,
    direccion_fiscal VARCHAR(254) NOT NULL,
    CONSTRAINT fk_empresa_org
    FOREIGN KEY (id)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
);

CREATE TABLE escuela(
    id UUID NOT NULL PRIMARY KEY,
    tipo_institucion VARCHAR(150) NOT NULL,
    url_sitio TEXT NOT NULL,
    CONSTRAINT fk_escuela_org
    FOREIGN KEY (id)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
);

CREATE TABLE comentarios(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    contenido TEXT NOT NULL,
    estado VARCHAR(150) NOT NULL,
    fecha DATE NOT NULL,
    id_usuario UUID NOT NULL,
    id_administrador UUID,
    CONSTRAINT fk_comentarios_usuarios
    FOREIGN KEY (id_administrador)
    REFERENCES usuarios(id),
    CONSTRAINT fk_comentarios_usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id)
    ON DELETE CASCADE
)

CREATE TABLE convenios(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    tipo VARCHAR(150) NOT NULL,
    estado BOOLEAN NOT NULL,
    fecha_registro DATE NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_final DATE NOT NULL
);

CREATE TABLE convenioorganizacion(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    rol VARCHAR(150) NOT NULL,
    id_convenio UUID NOT NULL,
    id_organizacion UUID NOT NULL,
    CONSTRAINT fk_convenioorganizacion_convenios
    FOREIGN KEY (id_convenio)
    REFERENCES convenios(id),
    CONSTRAINT fk_convenioorganizacion_organizaciones
    FOREIGN KEY (id_organizacion)
    REFERENCES organizaciones(id)
);

CREATE TABLE cuentas(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    correo VARCHAR(254) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    roles TEXT[] NOT NULL,
    id_usuario UUID NOT NULL,
    CONSTRAINT fk_cuentas_usuarios
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id)
    ON DELETE CASCADE
);

CREATE TABLE empresacamara(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    estado VARCHAR(150) NOT NULL,
    fecha_afiliacion DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    id_empresa UUID NOT NULL,
    id_camara UUID NOT NULL,
    CONSTRAINT fk_empresacamara_empresa
    FOREIGN KEY (id_empresa)
    REFERENCES empresas(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_empresascamaras_camara
    FOREIGN KEY (id_camara)
    REFERENCES camaras(id)
    ON DELETE CASCADE
);

CREATE TABLE eventos(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    titulo VARCHAR(254) NOT NULL,
    descripcion TEXT NOT NULL,
    tipo VARCHAR(150) NOT NULL,
    id_organizacion UUID NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_final DATE NOT NULL,
    fecha_publicacion DATE NOT NULL,
    CONSTRAINT fk_eventos_org
    FOREIGN KEY (id_organizacion)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
);

CREATE TABLE fotos(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    url_imagen TEXT NOT NULL,
    id_evento UUID NOT NULL,
    CONSTRAINT fk_eventos_fotoss
    FOREIGN KEY (id_evento)
    REFERENCES eventos(id)
);

CREATE TABLE historicosevento(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
    accion VARCHAR(50) NOT NULL,
    id_evento UUID NOT NULL,
    id_usuario UUID,
    CONSTRAINT fk_historicoseventos_evento
    FOREIGN KEY (id_evento)
    REFERENCES eventos(id),
    CONSTRAINT fk_historicoseventos_usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id)
);

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
);

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
);

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
    CONSTRAINT fk_ofertaslaborales_empresa
    FOREIGN KEY (id_empresa)
    REFERENCES empresas(id)
);

CREATE TABLE historicosoferta(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
    accion VARCHAR(50) NOT NULL,
    id_oferta UUID NOT NULL,
    id_usuario UUID NOT NULL,
    CONSTRAINT fk_historicosofertas_oferta
    FOREIGN KEY (id_oferta)
    REFERENCES ofertaslaborales(id),
    CONSTRAINT fk_historicosofertas_usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id)
);

CREATE TABLE postulaciones(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    estado VARCHAR(150) NOT NULL,
    fecha_postulacion DATE NOT NULL,
    id_oferta_laboral UUID NOT NULL,
    id_usuario UUID NOT NULL,
    CONSTRAINT fk_postulaciones_usuarios
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id),
    CONSTRAINT fk_postulaciones_ofertas_laborales
    FOREIGN KEY (id_oferta_laboral)
    REFERENCES ofertaslaborales(id)
);

CREATE TABLE seguimientos(
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
    id_seguido UUID NOT NULL,
    id_seguidor UUID NOT NULL,
    CONSTRAINT fk_seguimientos_usuario_seguido
    FOREIGN KEY (id_seguido)
    REFERENCES usuarios(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_seguimientos_usuario_seguidor
    FOREIGN KEY (id_seguidor)
    REFERENCES usuarios(id)
    ON DELETE CASCADE
)
