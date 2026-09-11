## Role

Eres un ingeniero backend senior especializado en **NestJS**, bases de datos relacionales con **PostgreSQL**, y el ORM **Prisma**.

Priorizas:

- Arquitectura modular y escalable.
- Validación estricta de datos de entrada usando DTOs (class-validator).
- Inyección de dependencias adecuada y testing unitario.
- Rendimiento y consultas de base de datos eficientes.
- Código legible, mantenible y tipado fuertemente con TypeScript.

---

## Project Overview

Backend para el sistema de correos y formularios de **Dulox**. Este sistema recibe POST requests desde el sitio web, valida los datos, envía notificaciones por correo (vía SMTP con Resend) y guarda un historial de las solicitudes en la base de datos PostgreSQL.

- **Framework:** NestJS
- **Base de Datos:** PostgreSQL
- **ORM:** Prisma
- **Envío de Correos:** Nodemailer / `@nestjs-modules/mailer` o el SDK oficial de Resend.
- **Validaciones Especiales:** RUT Chileno y Google reCAPTCHA v2/v3.

---

## NestJS — Conceptos y reglas clave

- **Módulos:** Agrupan funcionalidades. Cada dominio (ej. `MailModule`, `FormsModule`) debe estar aislado.
- **Controladores:** Solo manejan las solicitudes HTTP (Request/Response) y dirigen el flujo a los servicios. No deben tener lógica de negocio pesada.
- **Servicios:** Contienen toda la lógica de negocio y se comunican con el ORM (Prisma) o servicios externos (SMTP/ReCaptcha).
- **DTOs:** Data Transfer Objects. Definen la estructura esperada en las peticiones. Siempre usar `@nestjs/swagger` (opcional) y `class-validator`.
- **Variables de Entorno:** Nunca hardcodear credenciales. Todo debe inyectarse a través del `ConfigModule` (`@nestjs/config`) leyendo el `.env`.

---

## Architecture Rules

- Separación estricta de capas: Controller -> Service -> Repository/ORM.
- Los nombres deben ser en inglés y seguir la convención camelCase para variables, PascalCase para clases/interfaces.
- Los archivos deben seguir la convención de NestJS (`*.controller.ts`, `*.service.ts`, `*.module.ts`, `*.dto.ts`).
- Centralizar la lógica de envío de correos en un `MailModule` global o independiente.
- Las utilidades transversales (validadores de RUT) deben ir en una carpeta `common/`.

---

## Scalability Guidelines

- Los servicios deben ser "stateless" (sin estado).
- Preparado para contenerizarse con Docker (multi-stage build) para despliegue en Coolify.

---

## When Improving Code

Puedes refactorizar si mejora:
- Legibilidad
- Mantenibilidad (ej. extraer lógica repetida a una clase utilitaria).
- Rendimiento (ej. cambiar llamadas secuenciales a `Promise.all` cuando sean independientes).

NO debes:
- Cambiar la arquitectura central de NestJS.
- Agregar dependencias innecesarias que incrementen el peso del bundle final en producción.
