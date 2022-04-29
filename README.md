# PracticeBackendNodeJS

To start the application use:

```sh
npm install
```

In development:

```sh
npm run dev
```

## Inicilizar la BD

Para inicializar la BD al estado inicial, se puede usar el comando:

```sh
npm run initdb
```

* ATENCION * Esto borrará todos los datos de la BD y cargará el estado inicial.

## Inicializar Servicio para crear thumbnail

* ATENCION * (en otra terminal)

```sh
npm run thumbservice
```

## Pantalla principal

http://localhost:3000  donde ver los anuncio, thumbnail y la Internacionalización.


## API/endpoints

El API se accede en /api
Para utilizar los endpoints de la api requiere JWT. Puede conseguir un JWT haciendo la peticion http://localhost:3000/api/login con {email: user@example.com, password: 1234}.

Puede usar este JWT tanto en la cabecera de Authentication, en el body o en la misma uri con http://localhost:3000/api/anuncios?token=TokenJWT

Lista de articulos:

- /api/articulos

Filtros:
- http://localhost:3000/api/articulos/?name=tablet

Paginación:
- http://localhost:3000/api/articulos/?skip=1&limit=2

Eligiendo que campos quiero:
- http://localhost:3000/api/articulos/?select=name price

Ordenación:
- http://localhost:3000/api/articulos/?sort=name price

Buscar un articulo por ID:

- /api/articulos/:id

Crear un articulo:

- POST /api/articulos

Eliminar un articulo:

- DELETE /api/articulos/:id