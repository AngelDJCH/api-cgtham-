-- Insertar algunos contactos de ejemplo
INSERT INTO contactos (id, correo, telefono) VALUES 
(gen_random_uuid(), 'contacto@tyasa.com', '2721234567'),
(gen_random_uuid(), 'vinculacion@ito.edu.mx', '2727654321'),
(gen_random_uuid(), 'presidencia@canaco-orizaba.com', '2720001122');

-- Insertar algunas direcciones de ejemplo
INSERT INTO direcciones (id, calle, numero, colonia, codigo_postal, ciudad, estado, pais) VALUES 
(gen_random_uuid(), 'Autopista Mex-Ver', 'KM 272', 'Zona Industrial', '94450', 'Ixtaczoquitlán', 'Veracruz', 'México'),
(gen_random_uuid(), 'Av. Tecnológico', '952', 'Emiliano Zapata', '94320', 'Orizaba', 'Veracruz', 'México'),
(gen_random_uuid(), 'Calle Real', '123', 'Centro', '94300', 'Orizaba', 'Veracruz', 'México');

DO $$ 
DECLARE 
    v_cont_tyasa UUID; v_dir_tyasa UUID;
    v_cont_ito UUID; v_dir_ito UUID;
    v_cont_canaco UUID; v_dir_canaco UUID;
    v_id_tyasa UUID := gen_random_uuid();
    v_id_ito UUID := gen_random_uuid();
    v_id_canaco UUID := gen_random_uuid();
BEGIN
    -- Obtener IDs creados arriba (o crear nuevos para este ejemplo)
    INSERT INTO contactos (correo, telefono) VALUES ('info@tyasa.com', '2721001010') RETURNING id INTO v_cont_tyasa;
    INSERT INTO direcciones (calle, numero, colonia, codigo_postal, ciudad, estado, pais) 
    VALUES ('Carr. Federal', 'S/N', 'Parque Industrial', '94450', 'Ixtac', 'Veracruz', 'México') RETURNING id INTO v_dir_tyasa;

    -- 1. INSERTAR EN ORGANIZACIONES
    INSERT INTO organizaciones (id, nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, estado, id_contacto, id_direccion)
    VALUES (v_id_tyasa, 'TYASA', 'Siderúrgica de alta tecnología', 'Empresa', 'Siderurgia', 2000, 'Industrial', 'TYA800101ABC', 'logo_tyasa.png', 'banner_tyasa.jpg', true, v_cont_tyasa, v_dir_tyasa);

    -- 2. INSERTAR EN EMPRESAS (Especialización)
    INSERT INTO empresas (id, razon_social, regimen_fiscal, direccion_fiscal)
    VALUES (v_id_tyasa, 'Talleres y Aceros S.A. de C.V.', 'Régimen General de Ley Personas Morales', 'Misma que dirección comercial');

    -- Repetir para Institución Educativa (ITO)
    INSERT INTO contactos (correo, telefono) VALUES ('difusion@orizaba.tecnm.mx', '2727244016') RETURNING id INTO v_cont_ito;
    INSERT INTO direcciones (calle, numero, colonia, codigo_postal, ciudad, estado, pais) 
    VALUES ('Av. Tecnológico', '952', 'Zapata', '94320', 'Orizaba', 'Veracruz', 'México') RETURNING id INTO v_dir_ito;

    INSERT INTO organizaciones (id, nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, estado, id_contacto, id_direccion)
    VALUES (v_id_ito, 'Instituto Tecnológico de Orizaba', 'Institución de educación superior tecnológica', 'Escuela', 'Educación', 500, 'Educativo', 'ITO123456HJR', 'logo_ito.png', 'banner_ito.jpg', true, v_cont_ito, v_dir_ito);

    INSERT INTO escuelas (id, tipo_institucion, url_sitio)
    VALUES (v_id_ito, 'Pública', 'https://www.orizaba.tecnm.mx');

    -- Repetir para Cámara (CANACO)
    INSERT INTO contactos (correo, telefono) VALUES ('canaco@prodigy.net.mx', '2727251234') RETURNING id INTO v_cont_canaco;
    INSERT INTO direcciones (calle, numero, colonia, codigo_postal, ciudad, estado, pais) 
    VALUES ('Madero Norte', '505', 'Centro', '94300', 'Orizaba', 'Veracruz', 'México') RETURNING id INTO v_dir_canaco;

    INSERT INTO organizaciones (id, nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, estado, id_contacto, id_direccion)
    VALUES (v_id_canaco, 'CANACO ORIZABA', 'Cámara de comercio local', 'Cámara', 'Comercio', 50, 'Gremial', 'CAN700505XYZ', 'logo_canaco.png', 'banner_canaco.jpg', true, v_cont_canaco, v_dir_canaco);

    INSERT INTO camaras (id, nombre, presidente)
    VALUES (v_id_canaco, 'Cámara Nacional de Comercio Orizaba', 'Lic. Juan Pérez Pérez');

END $$;

INSERT INTO ofertaslaborales (
    titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios, 
    habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad, 
    experiencia, estado, fecha_publicacion, id_empresa
)
SELECT 
    'Ingeniero de Mantenimiento', 
    'Encargado de mantenimiento preventivo de hornos', 
    25000.00, 'Completa', 'Indefinido', 2, 'Seguro de vida, Vales de despensa', 
    'PLC, Mecatrónica', 'Liderazgo, Trabajo en equipo', 'Producción', 'Presencial', 
    '3 años', 'Activa', CURRENT_DATE, id 
FROM organizaciones WHERE nombre_comercial = 'TYASA';

-- =============================================================================
-- INSERCIÓN DE COMENTARIOS CON UUIDS PROPORCIONADOS
-- =============================================================================

-- 1. Comentario para la Organización 1 (Estado: Aprobado)
INSERT INTO comentarios (contenido, estado, fecha, id_organizacion, id_administrador)
VALUES (
    'Excelente vinculación con el sector industrial de la región.', 
    'Aprobado', 
    '2024-03-25', 
    '486ce60a-a866-4f3c-bf1f-d6e42a72ae1a', 
    NULL -- Se deja en NULL si aún no tienes IDs de la tabla 'cuentas'
);

-- 2. Comentario para la Organización 2 (Estado: Pendiente)
INSERT INTO comentarios (contenido, estado, fecha, id_organizacion, id_administrador)
VALUES (
    'Las instalaciones son adecuadas para los eventos de capacitación.', 
    'Pendiente', 
    '2024-03-26', 
    'a9fc7507-14d9-4663-a6e4-03ec6dad2695', 
    NULL
);

-- 3. Comentario para la Organización 3 (Estado: Borrador)
INSERT INTO comentarios (contenido, estado, fecha, id_organizacion, id_administrador)
VALUES (
    'Pendiente revisar convenio de colaboración para este semestre.', 
    'Borrador', 
    '2024-03-27', 
    '1d7462d1-1e40-4dc0-9a6d-c9f754040b19', 
    NULL
);

-- 4. Comentario Adicional para la Organización 1 (Estado: Aprobado)
INSERT INTO comentarios (contenido, estado, fecha, id_organizacion, id_administrador)
VALUES (
    'Líder en innovación y desarrollo de talento local.', 
    'Aprobado', 
    '2024-03-28', 
    '486ce60a-a866-4f3c-bf1f-d6e42a72ae1a', 
    NULL
);

-- =============================================================================
-- INSERCIÓN DE 10 EVENTOS
-- IDs Organizaciones: 
-- Org 1: 486ce60a-a866-4f3c-bf1f-d6e42a72ae1a
-- Org 2: a9fc7507-14d9-4663-a6e4-03ec6dad2695
-- Org 3: 1d7462d1-1e40-4dc0-9a6d-c9f754040b19
-- =============================================================================

INSERT INTO eventos (titulo, descripcion, tipo, estado, id_organizacion, fecha_inicio, fecha_final, fecha_publicacion) VALUES
-- Eventos para Organización 1
(
    'Feria de Reclutamiento Industrial 2024', 
    'Evento masivo para la captación de talento en áreas de ingeniería y mantenimiento.', 
    'Reclutamiento', 'Publicado', '486ce60a-a866-4f3c-bf1f-d6e42a72ae1a', 
    '2024-05-15', '2024-05-16', '2024-04-01'
),
(
    'Taller de Seguridad en Alturas', 
    'Capacitación técnica obligatoria para personal de mantenimiento y contratistas externos.', 
    'Capacitación', 'Activo', '486ce60a-a866-4f3c-bf1f-d6e42a72ae1a', 
    '2024-06-10', '2024-06-12', '2024-05-20'
),
(
    'Simulacro Nacional de Protección Civil', 
    'Ejercicio de evacuación y respuesta ante emergencias en planta industrial.', 
    'Seguridad', 'Borrador', '486ce60a-a866-4f3c-bf1f-d6e42a72ae1a', 
    '2024-09-19', '2024-09-19', '2024-09-01'
),

-- Eventos para Organización 2
(
    'Congreso de Innovación Tecnológica', 
    'Ciclo de conferencias sobre inteligencia artificial aplicada a la manufactura.', 
    'Conferencia', 'Publicado', 'a9fc7507-14d9-4663-a6e4-03ec6dad2695', 
    '2024-07-20', '2024-07-22', '2024-06-01'
),
(
    'Open House Universitario', 
    'Recorrido por las instalaciones y laboratorios para estudiantes de bachillerato.', 
    'Vinculación', 'Publicado', 'a9fc7507-14d9-4663-a6e4-03ec6dad2695', 
    '2024-04-25', '2024-04-25', '2024-03-15'
),
(
    'Torneo de Robótica Regional', 
    'Competencia estudiantil de diseño y programación de prototipos automatizados.', 
    'Competencia', 'Pendiente', 'a9fc7507-14d9-4663-a6e4-03ec6dad2695', 
    '2024-08-05', '2024-08-07', '2024-07-01'
),

-- Eventos para Organización 3
(
    'Networking Empresarial Orizaba', 
    'Cena de negocios para fortalecer alianzas entre proveedores y empresas locales.', 
    'Networking', 'Publicado', '1d7462d1-1e40-4dc0-9a6d-c9f754040b19', 
    '2024-05-30', '2024-05-30', '2024-05-01'
),
(
    'Seminario de Actualización Fiscal', 
    'Charla sobre las nuevas disposiciones del SAT para el ejercicio 2024.', 
    'Legal', 'Publicado', '1d7462d1-1e40-4dc0-9a6d-c9f754040b19', 
    '2024-04-12', '2024-04-12', '2024-03-20'
),
(
    'Expo Proveedores de la Región', 
    'Muestra comercial de servicios y productos industriales para el sector manufacturero.', 
    'Exposición', 'Finalizado', '1d7462d1-1e40-4dc0-9a6d-c9f754040b19', 
    '2024-02-15', '2024-02-17', '2024-01-15'
),
(
    'Foro de Sustentabilidad Ambiental', 
    'Discusión sobre el manejo de residuos y huella de carbono en la industria local.', 
    'Foro', 'Publicado', '1d7462d1-1e40-4dc0-9a6d-c9f754040b19', 
    '2024-11-05', '2024-11-06', '2024-10-01'
);

-- =============================================================================
-- INSERCIÓN DE DATOS EN LA TABLA: fotos
-- Vinculando las 3 URLs de Unsplash a los 10 IDs de eventos proporcionados
-- =============================================================================

INSERT INTO fotos (url_imagen, id_evento) VALUES 
-- Evento 1
('https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '81f0020f-09f4-400a-be57-cdbd75703ab9'),

-- Evento 2
('https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '9441521d-3e6a-4b84-87b1-1be1becb2cb9'),

-- Evento 3
('https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '3908bcbd-0564-4d1a-962f-6a7667e1d402'),

-- Evento 4
('https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '56688d7d-20cd-4148-b15d-738880dafc43'),

-- Evento 5
('https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'f8f1f902-6793-4de2-813b-15f3be65f625'),

-- Evento 6
('https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'ea3e2873-9569-4d02-b535-205100deedb7'),

-- Evento 7
('https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'ab5fdf19-8e11-471b-972c-8b1cb9fd0cc4'),

-- Evento 8
('https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '4c1d903d-48c0-4a7e-98cd-6d64c2966e6b'),

-- Evento 9
('https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '9199cc8b-0528-4748-8ab9-6e526ce1eddc'),

-- Evento 10
('https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'fabcbc7b-a5f6-4260-b815-fea0c3fb4f6e');