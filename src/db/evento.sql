CREATE TABLE eventos(
    id UUID DEFAULT uuid_generate_v4() NOT NULL,
    titulo VARCHAR(254) NOT NULL,
    descripcion TEXT NOT NULL,
    tipo VARCHAR(150) NOT NULL,
    estado VARCHAR(150) NOT NULL,
    id_organizacion UUID NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_final DATE NOT NULL,
    fecha_publicacion DATE NOT NULL,
    CONSTRAINT fk_eventos_org
    FOREIGN KEY (id_organizacion)
    REFERENCES organizaciones(id)
    ON DELETE CASCADE
)


-- 1. Eliminamos la restricción que te está bloqueando
ALTER TABLE fotos 
DROP CONSTRAINT fk_eventos_fotoss;

-- 2. La volvemos a crear incluyendo el ON DELETE CASCADE
ALTER TABLE fotos 
ADD CONSTRAINT fk_eventos_fotoss
FOREIGN KEY (id_evento) -- <-- Asegúrate de que este sea el nombre real de la columna en tu tabla fotos
REFERENCES eventos(id) 
ON DELETE CASCADE;