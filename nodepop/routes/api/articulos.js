'use strict';

const express = require('express');
const createError = require('http-errors');
const Articulos = require('../../models/Articulo');

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
      console.log('hola');
    } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
      console.log('hola');
    } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
      console.log('hola');
    } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
      console.log('hola');
    } catch (err) {
    next(err);
  }
});


module.exports = router;