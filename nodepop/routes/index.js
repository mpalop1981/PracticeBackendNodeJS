var express = require('express');
const Articulo = require("../models/Articulo")
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {  
  try {
    res.locals.title = 'Nodepop API';
    const name = req.query.name;
    const tag = req.query.tag;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select;
    const sort = req.query.sort;

    const filters = {};

    if (name) {
      filters.name = name;
    }

    if (tag) {
      filters.tag = tag;
    }

    const results = await Articulo.lista(filters, skip, limit, select, sort);
    res.render('index', { results, title: 'NodePop' });
  } catch (err) {
    next(err);
  }  
});

module.exports = router;
