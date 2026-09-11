# ============================================
# Etapa 1: Build
# ============================================
FROM node:22-alpine AS build

WORKDIR /app

# Activar pnpm vía corepack (lee la versión de "packageManager" en package.json)
RUN corepack enable

# Copiar manifiestos (aprovecha caché de capas)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Instalar TODAS las dependencias (dev incluidas) de forma reproducible
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Generar cliente Prisma
RUN pnpm exec prisma generate

# Compilar la app
RUN pnpm run build

# ============================================
# Etapa 2: Runtime
# ============================================
FROM node:22-alpine AS runtime

WORKDIR /app

RUN corepack enable

# Copiar manifiestos y el esquema de Prisma (crucial para que se genere el cliente)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma

# Instalar SOLO dependencias de producción.
# Al tener prisma/schema.prisma presente, @prisma/client generará el cliente automáticamente.
RUN pnpm install --frozen-lockfile --prod

# Copiar artefactos desde la etapa de build
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]