-- Consultas generadas con IA para ejemplos locales

DO $$ 
DECLARE 
    -- Variables para guardar IDs temporales
    v_dir_id UUID;
    v_con_id UUID;
    v_org_id UUID;
BEGIN

--------------------------------------------------------------------------------
-- 1. EMPRESAS (13 TOTAL)
--------------------------------------------------------------------------------
-- Ejemplo para AKWEL (Se repite la lógica para las demás)
-- Nota: He simplificado datos como RFC o Calle para el ejemplo masivo.

FOR i IN 1..13 LOOP
    -- Crear Dirección
    INSERT INTO direciones (calle, numero, colonia, codigo_postal, ciudad, estado, pais)
    VALUES ('Av. Principal Industrial', i, 'Parque Industrial', '94470', 'Ixtaczoquitlán', 'Veracruz', 'México')
    RETURNING id INTO v_dir_id;

    -- Crear Contacto
    INSERT INTO contactos (correo, telefono)
    VALUES ('contacto' || i || '@empresa.com', '272123456' || i)
    RETURNING id INTO v_con_id;

    -- Crear Organización Base
    INSERT INTO organizaciones (nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, estado, id_contacto, id_direccion)
    VALUES (
        CASE i 
            WHEN 1 THEN 'AKWEL' WHEN 2 THEN 'ALCOHOLERA' WHEN 3 THEN 'COMERVIC' 
            WHEN 4 THEN 'FLETES HESA' WHEN 5 THEN 'GRUPO MINERONI' WHEN 6 THEN 'HOLCIM' 
            WHEN 7 THEN 'KIMBERLY CLARK DE MÉXICO' WHEN 8 THEN 'LIVERPOOL ORIZABA' 
            WHEN 9 THEN 'PLAZA VALLE' WHEN 10 THEN 'ROVIANDA' WHEN 11 THEN 'TIUSA' 
            WHEN 12 THEN 'TVEO' WHEN 13 THEN 'TYASA' 
        END,
        'Empresa líder en su sector ubicada en la región de las Altas Montañas.',
        'EMPRESA', 'Industrial/Comercial', 500, 'Manufactura y Servicios', 'RFC' || i || 'XYZ123', 'logo.png', 'banner.png', TRUE, v_con_id, v_dir_id
    )
    RETURNING id INTO v_org_id;

    -- Especialización en tabla EMPRESAS
    INSERT INTO empresas (id, razon_social, regimen_fiscal, direccion_fiscal)
    VALUES (v_org_id, 'Razón Social de ' || i, 'Régimen General de Ley Personas Morales', 'Domicilio Fiscal Conocido');
END LOOP;

--------------------------------------------------------------------------------
-- 2. INSTITUCIONES EDUCATIVAS (6 TOTAL)
--------------------------------------------------------------------------------
FOR i IN 1..6 LOOP
    INSERT INTO direciones (calle, numero, colonia, codigo_postal, ciudad, estado, pais)
    VALUES ('Av. de la Educación', i, 'Centro', '94300', 'Orizaba', 'Veracruz', 'México')
    RETURNING id INTO v_dir_id;

    INSERT INTO contactos (correo, telefono)
    VALUES ('vinculacion' || i || '@escuela.edu.mx', '272724000' || i)
    RETURNING id INTO v_con_id;

    INSERT INTO organizaciones (nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, estado, id_contacto, id_direccion)
    VALUES (
        CASE i 
            WHEN 1 THEN 'CBTIS 142' WHEN 2 THEN 'CECATI 170' WHEN 3 THEN 'CONALEP' 
            WHEN 4 THEN 'Comunidad Morelos (CM)' WHEN 5 THEN 'Instituto Tecnológico de Orizaba (ITO)' 
            WHEN 6 THEN 'Instituto Tecnológico Superior de Zongolica (ITSZ)' 
        END,
        'Institución educativa de prestigio dedicada a la formación profesional.',
        'ESCUELA', 'Educación', 2000, 'Educación Superior/Media Superior', 'RFC_EDU' || i, 'escuela_logo.png', 'escuela_banner.png', TRUE, v_con_id, v_dir_id
    )
    RETURNING id INTO v_org_id;

    -- Especialización en tabla ESCUELA
    INSERT INTO escuela (id, tipo_institucion, url_sitio)
    VALUES (v_org_id, 'Pública', 'https://www.' || i || '.edu.mx');
END LOOP;

--------------------------------------------------------------------------------
-- 3. CÁMARAS DE TRABAJO (3 TOTAL)
--------------------------------------------------------------------------------
FOR i IN 1..3 LOOP
    INSERT INTO direciones (calle, numero, colonia, codigo_postal, ciudad, estado, pais)
    VALUES ('Calle Real', i + 100, 'Centro', '94300', 'Orizaba', 'Veracruz', 'México')
    RETURNING id INTO v_dir_id;

    INSERT INTO contactos (correo, telefono)
    VALUES ('info' || i || '@camara.org.mx', '272725555' || i)
    RETURNING id INTO v_con_id;

    INSERT INTO organizaciones (nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, estado, id_contacto, id_direccion)
    VALUES (
        CASE i 
            WHEN 1 THEN 'CANACO Orizaba' WHEN 2 THEN 'CANACINTRA Orizaba' WHEN 3 THEN 'CANIRAC Orizaba' 
        END,
        'Cámara empresarial dedicada a la gestión y fomento del comercio y la industria.',
        'CAMARA', 'Gremial', 50, 'Asociación Civil', 'RFC_CAM' || i, 'camara_logo.png', 'camara_banner.png', TRUE, v_con_id, v_dir_id
    )
    RETURNING id INTO v_org_id;

    -- Especialización en tabla CAMARAS
    INSERT INTO camaras (id, nombre, presidente)
    VALUES (v_org_id, 'Cámara ' || i, 'Presidente en Turno ' || i);
END LOOP;

END $$;


DO $$ 
DECLARE 
    v_conv_id UUID;
    v_org_ids UUID[];
    v_total_orgs INT;
    v_i INT;
    v_org_a UUID;
    v_org_b UUID;
BEGIN
    -- 1. Obtenemos todos los IDs de las organizaciones existentes en un array
    v_org_ids := ARRAY(SELECT id FROM organizaciones);
    v_total_orgs := array_length(v_org_ids, 1);

    -- 2. Bucle para crear 39 convenios
    FOR v_i IN 1..39 LOOP
        -- Insertar el convenio base
        INSERT INTO convenios (
            titulo, 
            descripcion, 
            tipo, 
            estado, 
            fecha_registro, 
            fecha_inicio, 
            fecha_final
        )
        VALUES (
            'Convenio de Colaboración #' || v_i,
            'Acuerdo estratégico para el desarrollo de proyectos en la región de las Altas Montañas.',
            CASE WHEN v_i % 2 = 0 THEN 'Académico' ELSE 'Industrial' END,
            TRUE,
            CURRENT_DATE - (v_i || ' days')::INTERVAL,
            CURRENT_DATE,
            CURRENT_DATE + '1 year'::INTERVAL
        )
        RETURNING id INTO v_conv_id;

        -- 3. Crear la relación entre DOS organizaciones para este convenio
        -- Elegimos dos organizaciones distintas usando el índice del bucle
        v_org_a := v_org_ids[(v_i % v_total_orgs) + 1];
        v_org_b := v_org_ids[((v_i + 5) % v_total_orgs) + 1];

        -- Relación Organización A (Rol: Prestador)
        INSERT INTO convenioorganizacion (rol, id_convenio, id_organizacion)
        VALUES ('Prestador de Servicios', v_conv_id, v_org_a);

        -- Relación Organización B (Rol: Receptor/Beneficiario)
        INSERT INTO convenioorganizacion (rol, id_convenio, id_organizacion)
        VALUES ('Receptor', v_conv_id, v_org_b);
        
    END LOOP;

    RAISE NOTICE 'Se han creado 39 convenios y sus respectivas relaciones.';
END $$;

DO $$ 
DECLARE 
    v_dir_id UUID;
    v_con_id UUID;
    v_user_id UUID;
    v_org_ids UUID[];
    v_total_orgs INT;
    v_i INT;
    v_org_id UUID;
    v_nombre TEXT;
    v_apellido TEXT;
BEGIN
    -- 1. Obtener los IDs de las 22 organizaciones de Orizaba
    v_org_ids := ARRAY(SELECT id FROM organizaciones);
    v_total_orgs := array_length(v_org_ids, 1);

    -- 2. Bucle para generar 300 registros
    FOR v_i IN 1..300 LOOP
        -- Seleccionar organización de forma circular
        v_org_id := v_org_ids[(v_i % v_total_orgs) + 1];
        
        v_nombre := 'Usuario_' || v_i;
        v_apellido := 'Apellido_' || v_i;

        -- A. Crear Dirección
        INSERT INTO direciones (calle, numero, colonia, codigo_postal, ciudad, estado, pais)
        VALUES ('Calle Ejemplo ' || v_i, v_i, 'Colonia Centro', '94300', 'Orizaba', 'Veracruz', 'México')
        RETURNING id INTO v_dir_id;

        -- B. Crear Contacto
        INSERT INTO contactos (correo, telefono)
        VALUES ('user' || v_i || '@ejemplo.com', '272' || LPAD(v_i::text, 7, '0'))
        RETURNING id INTO v_con_id;

        -- C. Crear Usuario (Vinculado a su organización correspondiente)
        INSERT INTO usuarios (
            nombre, apellido_paterno, apellido_materno, rfc, foto, banner, 
            estado, id_direccion, id_contacto, id_organizacion
        )
        VALUES (
            v_nombre, v_apellido, 'Materno', 'RFC' || v_i || 'USR', 
            'https://ui-avatars.com/api/?name=' || v_nombre, 'user_banner.png', 
            TRUE, v_dir_id, v_con_id, v_org_id
        )
        RETURNING id INTO v_user_id;

        -- D. Crear Cuenta (SIN CIFRADO)
        INSERT INTO cuentas (correo, contrasenia, roles, id_usuario)
        VALUES (
            'login' || v_i || '@sistema.com', 
            'pass123', -- Contraseña en texto plano para el ejemplo
            ARRAY['USER'], 
            v_user_id
        );

    END LOOP;

    RAISE NOTICE '¡Listo! 300 usuarios creados y repartidos entre las 22 organizaciones.';
END $$;

DO $$ 
DECLARE 
    v_emp_ids UUID[];
    v_total_emps INT;
    v_i INT;
    v_emp_id UUID;
BEGIN
    -- Obtener IDs de organizaciones que son EMPRESAS
    v_emp_ids := ARRAY(SELECT id FROM empresas);
    v_total_emps := array_length(v_emp_ids, 1);

    FOR v_i IN 1..120 LOOP
        v_emp_id := v_emp_ids[(v_i % v_total_emps) + 1];

        INSERT INTO ofertaslaborales (
            titulo, descripcion, salario, jornada, tipo_contrato, vacantes, 
            beneficios, habilidades_tecnicas, habilidades_blandas, 
            departamento_area, modalidad, experiencia, estado, fecha_publicacion, id_empresa
        )
        VALUES (
            'Vacante de ' || (CASE WHEN v_i % 2 = 0 THEN 'Ingeniería' ELSE 'Administración' END) || ' #' || v_i,
            'Únete a nuestro equipo en la región de Orizaba. Buscamos talento proactivo.',
            15000 + (v_i * 100), -- Salario variable para el ejemplo
            'Tiempo Completo',
            'Indefinido',
            (v_i % 5) + 1,
            'Prestaciones de ley, seguro de gastos médicos, vales de despensa.',
            'SQL, JavaScript, Gestión de Proyectos',
            'Liderazgo, Comunicación, Trabajo en equipo',
            'Operaciones',
            'Presencial',
            '2 años',
            'Activa',
            CURRENT_DATE - (v_i % 30 || ' days')::INTERVAL,
            v_emp_id
        );
    END LOOP;

    RAISE NOTICE '120 Ofertas laborales creadas exitosamente.';
END $$;

DO $$ 
DECLARE 
    v_org_ids UUID[];
    v_total_orgs INT;
    v_i INT;
    v_org_id UUID;
    v_event_id UUID;
BEGIN
    -- Obtener todas las organizaciones
    v_org_ids := ARRAY(SELECT id FROM organizaciones);
    v_total_orgs := array_length(v_org_ids, 1);

    FOR v_i IN 1..220 LOOP
        v_org_id := v_org_ids[(v_i % v_total_orgs) + 1];

        INSERT INTO eventos (
            titulo, descripcion, tipo, estado, id_organizacion, 
            fecha_inicio, fecha_final, fecha_publicacion
        )
        VALUES (
            'Evento Regional: ' || (CASE 
                WHEN v_i % 3 = 0 THEN 'Capacitación Industrial' 
                WHEN v_i % 3 = 1 THEN 'Foro Educativo' 
                ELSE 'Asamblea Gremial' END) || ' #' || v_i,
            'Evento organizado para fortalecer el networking y el conocimiento en las Altas Montañas.',
            'Presencial',
            'Programado',
            v_org_id,
            CURRENT_DATE + (v_i % 60 || ' days')::INTERVAL, -- Fechas a futuro
            CURRENT_DATE + (v_i % 60 || ' days')::INTERVAL + '4 hours'::INTERVAL,
            CURRENT_DATE
        )
        RETURNING id INTO v_event_id;

        -- Opcional: Crear una foto por cada evento para que no se vea vacío
        INSERT INTO fotos (url_imagen, id_evento)
        VALUES ('https://picsum.photos/seed/' || v_i || '/800/600', v_event_id);

    END LOOP;

    RAISE NOTICE '220 Eventos creados con sus respectivas fotos de portada.';
END $$;

DO $$ 
DECLARE 
    v_user_ids UUID[];
    v_admin_id UUID;
    v_total_users INT;
    v_i INT;
    v_usuario_random UUID;
    v_contenido TEXT;
    v_estado TEXT;
BEGIN
    -- 1. Obtener todos los IDs de usuarios para que comenten
    v_user_ids := ARRAY(SELECT id FROM usuarios);
    v_total_users := array_length(v_user_ids, 1);
    
    -- 2. Seleccionar un usuario al azar para que actúe como "Administrador" moderador
    v_admin_id := v_user_ids[1]; 

    -- 3. Bucle para generar 450 comentarios
    FOR v_i IN 1..450 LOOP
        -- Seleccionar un autor aleatorio del array
        v_usuario_random := v_user_ids[(v_i % v_total_users) + 1];

        -- Variedad de contenido
        v_contenido := CASE 
            WHEN v_i % 5 = 0 THEN 'Excelente oportunidad laboral, muy recomendada.'
            WHEN v_i % 5 = 1 THEN '¿Alguien sabe si el evento del ' || (CURRENT_DATE + 5) || ' será presencial?'
            WHEN v_i % 5 = 2 THEN 'Me gustaría recibir más información sobre los convenios vigentes.'
            WHEN v_i % 5 = 3 THEN 'Gran iniciativa de la cámara de comercio, felicidades.'
            ELSE 'Espero que sigan publicando vacantes para el sector industrial de Orizaba.'
        END;

        -- Variedad de estados
        v_estado := CASE 
            WHEN v_i % 10 = 0 THEN 'Pendiente'
            WHEN v_i % 10 = 1 THEN 'Rechazado'
            ELSE 'Aprobado'
        END;

        INSERT INTO comentarios (
            contenido, 
            estado, 
            fecha, 
            id_usuario, 
            id_administrador
        )
        VALUES (
            v_contenido,
            v_estado,
            CURRENT_DATE - (v_i % 60 || ' days')::INTERVAL, -- Comentarios de los últimos 2 meses
            v_usuario_random,
            CASE WHEN v_estado = 'Aprobado' THEN v_admin_id ELSE NULL END -- Solo los aprobados tienen admin
        );
    END LOOP;

    RAISE NOTICE '¡Hecho! 450 comentarios generados con éxito.';
END $$;