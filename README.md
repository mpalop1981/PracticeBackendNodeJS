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

El API se accede en /api

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