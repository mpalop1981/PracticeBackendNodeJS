const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
  // recoger parámetro del locale al que hay que cambiar
  const locale = req.params.locale;

  // poner una cookie en la respuesta que indique el nuevo locale
  res.cookie('nodeapp-locale', locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 1 mes
  });

  // hacer una redirección a la página desde la que venía
  res.redirect(req.get('Referer'));
});

module.exports = router;
