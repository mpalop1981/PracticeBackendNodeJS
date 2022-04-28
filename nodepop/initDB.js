'use strict';

require('dotenv').config();
const fsPromise = require('fs/promises');
const readline = require('readline');

const dbConnection = require('./lib/connectMongoose');

const Articulo = require('./models/Articulo');
const Usuario = require('./models/Usuario');

dbConnection.once('open', () => {
  main().catch(err => console.log('Hubo un error', err));
});

async function main() {
  const borrar = await pregunta(
    'Estas seguro de que quieres borrar la base de datos?',
  );
  if (!borrar) {
    process.exit(0);
  }

  // inicializar articulos
  await initArticulos();

  // inicializar usuarios
  await initUsuarios();

  // desconectar la base de datos
  dbConnection.close();
}

async function initUsuarios() {
  // borrar los usuarios existentes
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear usuarios
  const usuarios = await Usuario.insertMany([
    {
      email: 'admin@example.com',
      password: await Usuario.hashPassword('1234'),
      rol: 'admin',
    },
    {
      email: 'user1@example.com',
      password: await Usuario.hashPassword('1234'),
      rol: 'user',
    },
  ]);
  console.log(`Creados ${usuarios.length} usuarios.`);
}

async function initArticulos() {
  // borrar todos los articulos que haya en la colección
  const deleted = await Articulo.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} articulos.`);

  const data = await fsPromise.readFile('initDB.articulos.json', 'utf-8');
  const articuloData = JSON.parse(data);

  // crear articulos iniciales
  const articulos = await Articulo.insertMany(articuloData);
  console.log(`Creados ${articulos.length} articulos.`);
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {
    // conectar readline a la consola
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    // hacemos pregunta
    rl.question(texto, respuesta => {
      rl.close();
      if (respuesta.toLowerCase() === 'si') {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
