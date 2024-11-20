# Etapa 1: Construcción
FROM node:18 AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias y construir la aplicación
COPY package.json package-lock.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación Vite
RUN npm run build

# Instala un servidor estático para servir la aplicación
RUN npm install -g serve

# Etapa 2: Servidor
FROM node:18-alpine AS runner

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Instala serve globalmente
RUN npm install -g serve

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["serve", "-s", "dist", "-l", "3000"]