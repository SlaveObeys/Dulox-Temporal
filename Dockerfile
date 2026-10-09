# syntax=docker/dockerfile:1
# ============================================
# Etapa 1: Build
# ============================================
FROM node:22-alpine AS build

WORKDIR /app

# Activar pnpm vía corepack
RUN corepack enable

# Copiar manifiestos y Prisma (cambian poco: esta capa queda en caché)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma

# Instalar dependencias reutilizando el store de pnpm entre builds
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Generar cliente Prisma, compilar y dejar solo dependencias de producción
RUN pnpm exec prisma generate \
    && pnpm run build \
    && pnpm prune --prod --ignore-scripts


# ============================================
# Etapa 2: Runtime
# ============================================
FROM node:22-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

# Reutilizar node_modules ya podados (incluye el cliente Prisma generado)
COPY package.json ./
COPY prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy && exec node dist/main"]
