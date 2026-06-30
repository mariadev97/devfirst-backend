# DevFirst — Backend

API REST de DevFirst, construida con Node.js, Express y MongoDB (Mongoose).
Forma pareja con el repositorio `devfirst-frontend`.

## Stack

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT para autenticación
- bcryptjs para hashear contraseñas

## Cómo correrlo en local

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Copia `.env.example` a `.env` y rellena tus propios valores (cadena de
   conexión de MongoDB Atlas y un secreto para JWT):
   ```bash
   cp .env.example .env
   ```
3. Arranca el servidor en modo desarrollo (se reinicia solo al guardar cambios):
   ```bash
   npm run dev
   ```
4. Deberías ver en consola `✅ Conectado a MongoDB Atlas` y
   `✅ Servidor escuchando en http://localhost:4000`.

## Estructura

```
src/
  config/         Conexión a MongoDB
  models/         Esquemas de Mongoose (User, CandidatoProfile, EmpresaProfile, Oferta, Candidatura)
  controllers/    Lógica de cada endpoint
  routes/         Definición de rutas, agrupadas por recurso
  middleware/     Autenticación JWT y control de roles
  server.js       Punto de entrada de la aplicación
```

## Endpoints disponibles

### Auth
- `POST /api/auth/register` — registro (candidato o empresa)
- `POST /api/auth/login` — login, devuelve un token JWT

### Ofertas
- `GET /api/ofertas` — listado público, admite filtros `?modalidad=&area=&tecnologia=`
- `GET /api/ofertas/:id` — detalle de una oferta
- `POST /api/ofertas` — crear oferta (requiere token de empresa)
- `GET /api/ofertas/mias/listado` — ofertas propias (requiere token de empresa)

### Candidaturas
- `POST /api/candidaturas` — aplicar a una oferta (requiere token de candidato)
- `GET /api/candidaturas/mias` — candidaturas propias (requiere token de candidato)
- `GET /api/candidaturas/oferta/:ofertaId` — candidatos recibidos en una oferta (requiere token de empresa)

### Perfil
- `GET /api/perfil` — perfil propio (candidato o empresa, según el token)
- `PUT /api/perfil` — actualizar perfil propio

## Autenticación

Las rutas protegidas requieren el header:
```
Authorization: Bearer <token>
```
El token se obtiene en la respuesta de `/api/auth/login` o `/api/auth/register`.
