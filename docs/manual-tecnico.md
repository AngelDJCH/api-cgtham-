## COMISIÓN DE GESTIÓN DE TALENTO HUMANO DE LAS ALTAS MONTAÑAS
#### Manual Técnico
###### **Fecha:** 26-02-2026
###### **Última actualización:** 04-03-2026

### Descripción
API Rest Full para gestión de:
- Usuarios
- Organizaciones
- Convenios
- Ofertas Laborales
- Mensajería
- Históricos
- Eventos
- Postulaciones
- Inscripciones

Diseñada con:
1. Node.js : Runtime de JavaScript.
2. PostgreSQL : Base de Datos.
3. Jest : Testing
4. Express.js : Framework backend
5. Express-Validator : Validaciones
6. Cloudinary : Almacenamiento de archivos (fotos)
7. JSON Web Token (JWT) : Seguridad (Autenticación)


### Requisitos del entorno
- SO (Sistema Operativo): Windows 11
- Node.js v18+
- npm v9+
- Git
- Visual Studio Code
- PostgreSQL v14+
- Swagger (OpenAPI)

### Estructura del proyecto
```
|--/docs
|  |--manual-tecnico.md
|--/node_modules
|--/src
|  |--/config
|     |--cloudinary
|     |--postgres
|  |--/controllers
|  |--/db
|  |--/helpers
|  |--/midlewares
|     |--jwtToken
|  |--/models
|  |--/repository
|  |--/routes
|  |--/services
|  |--/validator
|--.env-example
|--index.js
|--package-lock.json
|--package.json
|--swagger_ouput.json
|--swagger.js
```

### Variables de entorno
**¿Qué necesitas?:**
- Archivo `.env` como en el ejemplo `.env-example`

**EJEMPLO:**
```
El backend (API) utiliza variables de entorno configuradas en un archivo 
.env

PORT = 3000
# ENV CLOUDINARY
CLOUDINARY_CLOUD_NAME=usuario
CLOUDINARY_API_KEY=api_key_cloud
CLOUDINARY_API_SECRET=api_secret_cloud

# ENV JWT (AUTENTICATION KEYS)
JWT_SECRET_KEY=secret_key_jwt
JWT_SECRET_KEY_RENNOVATION=secret_key_renovation_jwt

# ENV PORT (LISTENING API)
PORT_API_LISTENING=port_listening

# ENV DB (POSTGRESQL)
USER_DB = usuario
HOST_DB = host
NAME_DB = name
PASSWORD_DB = password
PORT_DB = port
```

**Nota:** No subas el .env al repositorio de GitHub, puedes omitirlo en el `.gitignore`.

### Ejecutar la API
1. Abrir el proyecto en Visual Studio Code.
- Lo puedes hacer dando clic derecho dentro de la carpeta que contiene los archivos y `Abrir con Code`
- Lo puedes hacer con comando (deberas primero abrir una terminal desde dentro de la carpeta)
```
code .
```
2. Instalar dependencias
```
npm install
```
3. Crear archivo `.env`
4. Ejecutar servidor:

**¿Qué necesitas?**
- Scripts de `package.json`

##### Scripts principales
- `npm run dev` -> Ejecuta el servidor en modo desarrollo.
- `npm start` -> Ejecuta el servidor en modo producción.
- `npm test` -> Ejecuta pruebas.

5. Podras visualizar si la API esta corriendo en el mensaje de la terminal.
- Verificar los end-points con `swagger` ó `postman`

### Notas para futuros residentes o desarrolladores
- La autenticación está implementada con JWT.
- No modificar la estructura de carpetas sin revisar dependencias.
- Falta implementar modulos, que deberán ser autorizados por los supervisores o encargados.

### Recomendaciones VS Code
Plugins recomendados:
1. Markdown Preview Enhanced (Yiyi Wang) : Visualizar el archivo `.md`
2. Node Extension Pack (Swellaby)
3. ESLint