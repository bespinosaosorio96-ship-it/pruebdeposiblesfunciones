# LogiTrack

Sistema web para la gestión de bodegas, productos, inventario y movimientos logísticos desarrollado con **Spring Boot**, **PostgreSQL**, **Spring Security** y **JWT**.

El proyecto fue desarrollado siguiendo una arquitectura por capas (Controller, Service y Repository) aplicando buenas prácticas de desarrollo con Spring Boot.

---

# Características

- Autenticación mediante JWT.
- Registro de usuarios.
- Gestión de productos.
- Gestión de bodegas.
- Gestión de inventario.
- Registro de movimientos de inventario.
- Auditoría de operaciones.
- Documentación de la API con Swagger/OpenAPI.
- Frontend desarrollado con HTML, CSS y JavaScript.
- Base de datos PostgreSQL.

---

# Tecnologías utilizadas

- Java 17
- Spring Boot
- Spring Security
- JWT (JSON Web Token)
- Spring Data JPA
- PostgreSQL
- Maven
- HTML5
- CSS3
- JavaScript
- Swagger / OpenAPI

---

# Arquitectura

El proyecto utiliza una arquitectura por capas.

```
Cliente
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
PostgreSQL
```

---

# Estructura del proyecto

```
src
├── main
│   ├── java
│   │   └── com.logitrack
│   │       ├── audit
│   │       ├── config
│   │       ├── controllers
│   │       ├── dto
│   │       ├── entities
│   │       ├── enums
│   │       ├── exceptions
│   │       ├── repositories
│   │       ├── security
│   │       └── services
│   │
│   └── resources
│       ├── static
│       │   ├── css
│       │   ├── js
│       │   ├── login.html
│       │   ├── index.html
│       │   ├── productos.html
│       │   ├── bodegas.html
│       │   └── movimientos.html
│       │
│       ├── application.properties
│       ├── schema.sql
│       └── data.sql
```

---

# Funcionalidades

## Usuarios

- Registro de usuarios.
- Inicio de sesión.
- Contraseñas cifradas con BCrypt.
- Autenticación mediante JWT.

---

## Productos

Permite:

- Registrar productos.
- Consultar productos.
- Actualizar productos.
- Eliminar productos.

Cada producto almacena:

- Nombre.
- Categoría.
- Precio.

---

## Bodegas

Permite:

- Registrar bodegas.
- Consultar bodegas.
- Actualizar bodegas.
- Eliminar bodegas.

Cada bodega almacena:

- Nombre.
- Ubicación.
- Capacidad.
- Usuario encargado.

---

## Inventario

El inventario controla la cantidad disponible de cada producto en cada bodega.

El stock **no pertenece al producto**, sino al inventario.

---

## Movimientos

El sistema registra tres tipos de movimientos:

- ENTRADA
- SALIDA
- TRANSFERENCIA

Cada movimiento almacena:

- Fecha.
- Usuario responsable.
- Bodega origen.
- Bodega destino.
- Productos.
- Cantidades.

Reglas implementadas:

- Las entradas aumentan el stock.
- Las salidas disminuyen el stock.
- Las transferencias descuentan del origen y aumentan en el destino.
- No se permite stock negativo.
- No se permiten cantidades menores o iguales a cero.

---

## Auditoría

Las operaciones importantes del sistema generan un registro de auditoría.

Se registra:

- Usuario.
- Fecha.
- Tipo de operación.
- Entidad afectada.
- Identificador de la entidad.
- Valores anteriores.
- Valores nuevos.

---

# Seguridad

Se implementó Spring Security utilizando autenticación basada en JWT.

Las rutas públicas son:

- /auth/login
- /auth/register
- Swagger/OpenAPI

Las demás rutas requieren autenticación mediante token.

---

# Documentación

La API puede consultarse mediante Swagger.

```
http://localhost:8080/swagger-ui/index.html
```

---

# Instalación

## Clonar el proyecto

```bash
git clone https://github.com/usuario/logitrack.git
```

---

## Configurar PostgreSQL

Crear una base de datos.

Ejemplo:

```
logitrack
```

Actualizar el archivo:

```
application.properties
```

con los datos de conexión correspondientes.

---

## Ejecutar scripts SQL

Ejecutar:

```
schema.sql
```

Posteriormente:

```
data.sql
```

---

## Ejecutar el proyecto

Desde la raíz del proyecto:

```bash
mvn spring-boot:run
```

o desde el IDE.

---

# Acceso

## Login

```
http://localhost:8080/login.html
```

---

## Página principal

```
http://localhost:8080/index.html
```

---

# Pruebas realizadas

Se verificó el correcto funcionamiento de:

- Registro de usuarios.
- Inicio de sesión.
- Generación y validación de JWT.
- CRUD de productos.
- CRUD de bodegas.
- Registro de movimientos.
- Entradas de inventario.
- Salidas de inventario.
- Transferencias entre bodegas.
- Actualización automática del inventario.
- Auditoría de operaciones.
- Consulta de movimientos por tipo.
- Consulta de movimientos por usuario.
- Consulta de movimientos por bodega.
- Consulta de movimientos por rango de fechas.
- Documentación Swagger.

---

# Autor

Proyecto desarrollado como trabajo académico para la asignatura de Desarrollo de Software utilizando Spring Boot.

Autor:
**Luis Gonzalez**
**Brayan Espinosa**

---

# Licencia

Proyecto desarrollado únicamente con fines académicos.