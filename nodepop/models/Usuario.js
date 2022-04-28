'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// creo el esquema
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  rol: String,
});

// método estático
usuarioSchema.statics.hashPassword = function (passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7);
};

// método de instancia
usuarioSchema.methods.comparePassword = function (passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
};
// creo el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// exporto el modelo
module.exports = Usuario;
