## Proyecto Natour Node - Express - MongoDB

Proyecto creado a partir del curso de Node. Este es creado haciendo uso de Node - Express y MongoDB.

# Pasos para ejecución de la App en modo de desarrollo:

1. Crear y validar variables de entorno necesarias para la aplicación.

2. Instalar dependencias de Node mediante el siguiente comando:

```
npm install
```

3. Levantar el contenedor de docker de la base de datos Mongo DB mediante el siguiente comando:

```
docker compose up -d
```

4. Para generar la data semilla y trabajar en modo de desarrollo realizar una petición `get` al siguiente url:

```
http://localhost:3000/api/v1/seed

```
