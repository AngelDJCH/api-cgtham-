CREATE TABLE cursoOrganizacion(
	id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
	fecha DATE NOT NULL,
	estado BOOLEAN NOT NULL,
	id_organizacion UUID NOT NULL,
	id_curso UUID NOT NULL,
	CONSTRAINT fk_curso
	FOREIGN KEY (id_curso)
	REFERENCES cursos(id)
	ON DELETE CASCADE,
	CONSTRAINT fk_organziacion
	FOREIGN KEY (id_organizacion)
	REFERENCES organizaciones(id)
	ON DELETE CASCADE
);