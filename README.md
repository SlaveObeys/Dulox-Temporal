<p align="center">
  <a href="https://dulox.cl/" target="_blank">
    <img src="https://cdn.shopify.com/s/files/1/0684/2377/8471/files/logo-2024120916220899407_x320.png" width="180" alt="Dulox Logo" />
  </a>
</p>

<h1 align="center">Dulox — Backend API de Formularios y Correos</h1>

<p align="center">
  Backend institucional de <strong>Dulox</strong> construido con <strong>NestJS</strong>, <strong>PostgreSQL</strong>, <strong>Prisma ORM</strong>, <strong>Nodemailer</strong> y <strong>Docker</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11.x-E0234E?logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-6.x-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white" alt="Docker" />
</p>

---

## ⚡ Inicio Rápido en Desarrollo (Paso a Paso)

Sigue estos simples pasos para tener la base de datos, el servidor de correos y la API corriendo en local:

### 1. Configurar variables de entorno

Crea tu archivo `.env` a partir de la plantilla de ejemplo:

```bash
cp .env.example .env
```

### 2. Iniciar contenedores locales (PostgreSQL + Mailpit)

Levanta la base de datos PostgreSQL 17 y la bandeja de correos local en segundo plano:

```bash
docker compose up -d
```

> _Nota: Si solo deseas levantar la base de datos, puedes ejecutar: `docker compose up -d dulox-db`_

### 3. Instalar dependencias

Instala los paquetes (genera automáticamente el cliente de Prisma):

```bash
pnpm install
```

### 4. Iniciar el Backend en modo desarrollo

Aplica automáticamente las migraciones pendientes en la base de datos y levanta el servidor con recarga en vivo:

```bash
pnpm run start:dev
```

---

## 🌐 Servicios y Puertos en Local

| Servicio           | URL / Host              | Puerto | Descripción / Credenciales                                 |
| :----------------- | :---------------------- | :----- | :--------------------------------------------------------- |
| **API Backend**    | `http://localhost:3000` | `3000` | Servidor NestJS                                            |
| **Mailpit Web UI** | `http://localhost:8026` | `8026` | Bandeja visual para ver correos enviados en local          |
| **Mailpit SMTP**   | `localhost`             | `1026` | Servidor SMTP local para desarrollo                        |
| **PostgreSQL 17**  | `localhost`             | `5433` | Usuario: `postgres` \| Password: `postgres` \| BD: `dulox` |

---

## 📬 Endpoints Disponibles (`POST /forms/...`)

Todos los endpoints validan tokens Google reCAPTCHA. Para desarrollo local puedes enviar `"g-recaptcha-response": "dev-token-dulox-test"`.

- **Contacto General**
  ```http
  POST /forms/contacto
  ```
- **Cotización de Productos** (con detalle y carrito)
  ```http
  POST /forms/cotizacion
  ```
- **Agendamiento Showroom**
  ```http
  POST /forms/showroom
  ```
- **Cotización Corte Láser**
  ```http
  POST /forms/corte-laser
  ```
- **Cotizar un Proyecto** (personalizado desde proyecto o general)
  ```http
  POST /forms/cotizar-proyecto
  ```
- **Trabaja con Nosotros** (con CV adjunto en PDF o Word vía `multipart/form-data`)
  ```http
  POST /forms/trabaja-con-nosotros
  ```

---

## 🗄️ Base de Datos y Prisma

- Aplicar migraciones pendientes a la base de datos:
  ```bash
  pnpm run prisma:migrate
  ```
- Crear una nueva migración tras cambiar `prisma/schema.prisma`:
  ```bash
  pnpm run prisma:migrate:dev
  ```
- Regenerar cliente tipado de Prisma:
  ```bash
  pnpm run prisma:generate
  ```
- Abrir visor visual interactivo de la base de datos:
  ```bash
  pnpm run prisma:studio
  ```

---

## 🧪 Pruebas y Calidad de Código

- Ejecutar tests unitarios:
  ```bash
  pnpm test
  ```
- Ejecutar tests de integración end-to-end (E2E):
  ```bash
  pnpm run test:e2e
  ```
- Ejecutar linter de código (Oxlint):
  ```bash
  pnpm run lint
  ```
- Compilar la aplicación para producción:
  ```bash
  pnpm run build
  ```

---

## 🚀 Despliegue en Producción (Coolify / VPS)

El proyecto está preparado para desplegarse mediante su [Dockerfile](file:///e:/Descargas/Dulox%20Correos/Dockerfile) multi-stage:

1. En Coolify, crea el recurso seleccionando este repositorio y apunta al archivo `Dockerfile`.
2. Configura las variables de entorno en el panel (base de datos PostgreSQL de la VPS y credenciales SMTP de Resend).
3. Al iniciar, el contenedor ejecutará automáticamente `prisma migrate deploy` asegurando que la base de datos siempre esté sincronizada.
