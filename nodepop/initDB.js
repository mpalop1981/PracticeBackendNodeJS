'use strict'

const fsPromise = require('fs/promises');
const readline = require('readline');

const dbConnection = require('./lib/connectMongoose');

const Articulo = require('./models/Articulo');

dbConnection.once('open', () => {
  main().catch(err => console.log('Hubo un error', err));
})

async function main() {

    const borrar = await pregunta('Estas seguro de que quieres borrar la base de datos?');
    if (!borrar) {
      process.exit(0);
    }
  
    // inicializar articulos
    await initArticulos();
  
    // desconectar la base de datos
    dbConnection.close();
  }

  function pregunta(texto) {
    return new Promise((resolve, reject) => {
      // conectar readline a la consola
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      // hacemos pregunta
      rl.question(texto, respuesta => {
        rl.close();
        if (respuesta.toLowerCase() === 'si') {
          resolve(true);
          return;
        }
        resolve(false);
      })
    });
  }

  async function initArticulos() {
    // borrar todos los articulos que haya en la colección
    const deleted = await Articulo.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} articulos.`);
  
    const data = await fsPromise.readFile('initDB.articulos.json', 'utf-8');
    const articuloData = JSON.parse(data);
  
    // crear agentes iniciales
    const articulos = await Articulo.insertMany(articuloData);
    console.log(`Creados ${articulos.length} articulos.`);
  }