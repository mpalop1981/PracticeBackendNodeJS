'use strict';

const express = require('express');
const createError = require('http-errors');
const Articulo = require('../../models/Articulo');

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
      res.locals.title = "Nodepop API"
      const name = req.query.name;
      const tag = req.query.tag;
      const skip = req.query.skip;
      const limit = req.query.limit;
      const select = req.query.select;
      const sort = req.query.sort;

      const filters = {};

      if (name){
        filters.name = name;
      }

      if(tag)
      {
        filters.tag = tag;
      }

      const articulos = await Articulo.lista(filters, skip, limit, select, sort);
      res.render('index',{results: articulos });
    } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const articulo = await Articulo.findOne({ _id: id });

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
    const articuloData = req.body;

    const articulo = new Articulo(articuloData);

    const articuloGuardado = await articulo.save();

    res.status(201).json({ result: articuloGuardado });

  } catch (err) {
    next(err);
  }
});


router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const articuloData = req.body;

    let articuloActualizado
    try {
      articuloActualizado = await Articulo.findByIdAndUpdate(id, articuloData, {
        new: true 
      });
    } catch (err) {
      next(createError(422, 'invalid id'));
      return;
    }

    if (!articuloActualizado) {
      next(createError(404));
      return;
    }

    res.json({ result: articuloActualizado });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    await Articulo.deleteOne({ _id: id });

    res.json();
  } catch (err) {
    next(err)
  }
});


module.exports = router;