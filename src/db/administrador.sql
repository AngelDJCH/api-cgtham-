-- ==========================================
-- 1. CREACIÓN DE CATÁLOGOS BASE (Contacto y Dirección de CGTHAM)
-- ==========================================
INSERT INTO contactos (id, correo, telefono)
VALUES (
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 
    'contacto@cgtham.org', 
    '2727250000' -- Clave lada regional de Orizaba
);

INSERT INTO direcciones (id, calle, numero, colonia, codigo_postal, ciudad, estado, pais)
VALUES (
    'f4e3d2c1-b0a9-8f7e-6d5c-4b3a2f1e0d9c', 
    'Avenida Oriente 9', -- Ubicación estratégica/asociada de vinculación regional
    '852', 
    'Emiliano Zapata', 
    '94320', 
    'Orizaba', 
    'Veracruz', 
    'México'
);

-- ==========================================
-- 2. CREACIÓN DE LA ORGANIZACIÓN (CGTHAM)
-- ==========================================
INSERT INTO organizaciones (id, nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, estado, id_contacto, id_direccion)
VALUES (
    '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', 
    'CGTHAM', 
    'Comité de Gestión de Talento Humano de las Altas Montañas. Organismo encargado de impulsar el desarrollo profesional, la vinculación empresarial (B2B) y la gestión estratégica del capital humano en la región de Córdoba-Orizaba.', 
    'COMITE', -- Tipo de organización adecuado
    'Desarrollo Profesional / Educación', 
    25, -- Tamaño estimado de miembros clave / mesa directiva
    'Asociaciones y Comités de Vinculación', 
    'CGT180524XX0', -- RFC genérico estructurado formalmente para el Comité
    'cgtham_logo.png', 
    'cgtham_banner.png', 
    TRUE, 
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', -- FK a contactos
    'f4e3d2c1-b0a9-8f7e-6d5c-4b3a2f1e0d9c'  -- FK a direcciones
);

-- ==========================================
-- 3. CREACIÓN DE LA CUENTA DEL ADMINISTRADOR (CGTHAM)
-- Contraseña original: Admin123*
-- Hash generado con: bcrypt.hashSync('Admin123*', 10)
-- ==========================================
INSERT INTO cuentas (id, correo, contrasenia, roles, id_organizacion)
VALUES (
    '11111111-2222-3333-4444-555555555555', 
    'admin@cgtham.org', -- Correo administrativo oficial del dominio
    '$2b$10$7R08N6W7p59gK2b8R3E6OOeXZyCqU199C2EieLlhgU3iZ6g5kGf1i', 
    ARRAY['ADMIN', 'SUPERUSER'], -- Roles dentro de la plataforma corporativa
    '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' -- FK a organizaciones (CGTHAM)
);

-- ==========================================
-- 6. CONFIGURACIÓN DE CLOUDINARY (CGTHAM)
-- ==========================================
INSERT INTO cloudinaryconfig (id, nombre, clave, clave_secreta, id_organizacion)
VALUES (
    'c2d3e4f5-a6b7-8c9d-0e1f-2a3b4c5d6e7f', -- ID propio de la configuración (UUID)
    'dfdfauyvo',                            -- Nombre (Cloud Name)
    '159733965513217',                      -- Clave (API Key)
    'sC88K0UYf2oqiqaOkfGQ0SF32AE',          -- Clave Secreta (API Secret)
    '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'  -- FK a organizaciones (ID de CGTHAM)
);