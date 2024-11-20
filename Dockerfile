# Etapa 1: Construcción
FROM node:18 AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias y construir la aplicación
COPY package.json package-lock.json ./

# Instala dependencias
RUN npm install --legacy-peer-deps

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación Next.js
RUN npm run build

# Instala las dependencias necesarias para producción
RUN npm prune --production

# Etapa 2: Servidor
FROM node:18-alpine AS runner

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos construidos desde la etapa anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "run", "start"]
