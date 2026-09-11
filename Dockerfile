# ============================================
# Etapa 1: Build
# ============================================
FROM node:22-alpine AS build

WORKDIR /app

# Activar pnpm vía corepack
RUN corepack enable

# Copiar manifiestos
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copiar Prisma antes de instalar dependencias
COPY prisma ./prisma

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

# Copiar manifiestos
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copiar Prisma
COPY prisma ./prisma

# Instalar SOLO dependencias de producción
RUN pnpm install --frozen-lockfile --prod

# Copiar artefactos desde la etapa de build
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]