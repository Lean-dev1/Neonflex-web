# Usamos una versión ligera de Node
FROM node:18-alpine

# Creamos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto que usa tu app
EXPOSE 3000

# Comando para iniciar (usamos dev para que use nodemon si lo configuraste)
CMD ["npm", "run", "dev"]