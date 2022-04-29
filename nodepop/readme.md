1º - npm install para instalar todos los paquetes necesario de dependencias.

2º - npm run initdb para crear 3 anuncios basicos de la aplicacion.

3º - npm run dev para iniciar el servidor en modo desarrollo.

4º - (en otra terminal), npm run thumbservice para iniciar el microservicio que crea las imagenes en miniatura (thumnail).

http://localhost:3000 pantalla principal donde ver los anuncio, thumbnail y la Internacionalización.

Para utilizar los endpoints de la api requiere JWT.
Puede conseguir un JWT haciendo la peticion  http://localhost:3000/api/login con {email: user@example.com, password: 1234}.

Puede usar este JWT tanto en la cabecera de Authentication, en el body o en la misma uri con http://localhost:3000/api/anuncios?token=TokenJWT