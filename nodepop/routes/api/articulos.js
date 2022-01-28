'use strict';

const express = require('express');
const createError = require('http-errors');
const Articulos = require('../../models/Articulo');

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
      const articulos = await Articulos.find();
      res.json({results: articulos });
    } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const articulo = await Articulos.findOne({ _id: id });

    if (!articulo) {
      next(createError(404));
      return;
    }   

    res.json({ result: articulo });
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