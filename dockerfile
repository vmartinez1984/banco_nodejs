# usa una imagen base de Node.ja
#FROM node:20-alpine
FROM node:slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

#Copia los archvios necesarios
COPY package*.json ./

# Instla las depéndencias
RUN npm install

#Copia el resto del codigo
COPY . .

EXPOSE 3000

#Define el comando de inicio
CMD ["npm","run", "dev"]

# ejecutar: docker build -t banco-node .
# docker run -p 3000:3000 banco-node